import mongoose from 'mongoose';
import {IConfig} from "config";

const connect = async (config: IConfig) => {

    const mongoURI: string = config.get('mongoURI');

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`Successfully connected to MongoDB.`);

    } catch (e) {
        console.log("Error connecting to database: ", e.message);
        process.exit(1);
    }
};

export default connect;
