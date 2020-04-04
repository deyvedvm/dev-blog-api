import express, {Request, Response} from 'express';
import {check, validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';

import User from '../models/User';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const users = await User.find({});

    return res.send(users);
});

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should be with 6 or more characters').isLength({min: 6})
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    let {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({errors: `User already exists`});
        }

        const avatar = generateGravatarUrl(email);

        password = await encryptPassword(password);

        user = createUserModel(name, email, avatar, password);

        await user.save();

        return res.send('User saved');

    } catch (e) {
        console.error(`Error ${e.message}  when try to find email`);
        return res.status(500).send(`Error when try to find email: ${email}`);
    }
});

function createUserModel(name: string, email: string, avatar: string, password: string) {
    return new User({
        name,
        email,
        avatar,
        password
    });
}

function generateGravatarUrl(email: string) {
    return gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });
}

async function encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
}

export default router;
