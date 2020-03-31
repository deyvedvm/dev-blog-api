import express from "express";

export default class UserController  {
    private path = '/users';
    private router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
    }

    getAllUsers = (request: express.Request, response: express.Response) => {
        response.send('Users');
    }
}
