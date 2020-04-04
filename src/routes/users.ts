import express, {Request, Response} from 'express';
import {check, validationResult} from 'express-validator';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('GET users');
});

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should be with 6 or more characters').isLength({min: 6})
], (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const user = req.body;

    res.send('POST users');
});

export default router;
