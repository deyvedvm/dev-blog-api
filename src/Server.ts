import {Express, Request, Response} from "express";
import bodyParser from 'body-parser';

export default class Server {

    private app: Express;

    constructor(app: Express) {
        this.app = app;

        this.app.get("/api", (req: Request, res: Response): void => {
            res.send("You have reached the API!");
        });
    }

    public initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    public initializeControllers(controllers: any) {
        controllers.forEach((controller: any) => {
            this.app.use('/api', controller.router);
        });
    }

    public listen(port: string | number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }
}
