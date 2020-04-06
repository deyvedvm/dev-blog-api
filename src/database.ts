import mongoose from 'mongoose';
import {IConfig} from "config";

const connect = (config: IConfig) => {

    const mongoURI: string = config.get('mongoURI');

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log(`Successfully connected to MongoDB.`);
    }).catch((err) => {
        console.log("Error connecting to database: ", err.message);
        process.exit(1);
    });
};

export default connect;
