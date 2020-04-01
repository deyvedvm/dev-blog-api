import express, {Request, Response} from 'express';

const router = express.Router();

// @route GET api/users
// @desc Users route
// @access Public
router.get('/', (req: Request, res: Response) => {
    res.send('Users router');
});

export default router;
