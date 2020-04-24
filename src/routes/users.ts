import express, {Request, Response} from 'express';
import {check, validationResult} from 'express-validator';
import config from 'config';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import jwt from 'jsonwebtoken';
import ramda from 'ramda';

import User from '../models/User';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {

    const users = await User.find().sort('name');

    // users.map(({password, ...users}) => users);

    return res.send(users.map(user => pickFields(user)));
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

        const token = generateToken({id: user.id});

        return res.header('x-auth-token', token).send(pickFields(user));

    } catch (e) {
        console.error(`Error ${e.message}  when try to find email`);
        return res.status(500).send(`Error when try to find email: ${email}`);
    }
});

router.delete('/:id', async (req: Request, res: Response) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send(`The user not found with the id ${req.params.id}`);

    return res.send(pickFields(user));
});

function generateToken(payload: any) {
    const jwtSecret: string = process.env.JWT_SECRET || config.get('jwtSecret');

    return jwt.sign(payload, jwtSecret, {expiresIn: '360000'});
}

function pickFields(user: any) {
    return ramda.pick(['id', 'name', 'email', 'avatar', 'date'], user)
}

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
