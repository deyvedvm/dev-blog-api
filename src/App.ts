import express, {Express} from "express";

import Server from "./Server";
import Database from "./config/Database";
import UserController from "./controllers/UserController";

const app: Express = express();

const PORT: string | number = process.env.PORT || 5000;
const databaseURL: string = "mongodb+srv://dev-blog-username:dev-blog-password@cluster0-ap7y5.mongodb.net/test?retryWrites=true&w=majority";

const server = new Server(app);
server.initializeMiddlewares();
server.initializeControllers([
        new UserController()
    ]
);
server.listen(PORT);

const database = new Database();
database.connect(databaseURL);

