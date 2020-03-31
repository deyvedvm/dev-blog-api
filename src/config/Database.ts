import mongoose from 'mongoose';

export default class Database {

    constructor() {
    }

    public async connect(databaseURL: string): Promise<void> {
        try {
            await mongoose.connect(databaseURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log(`Successfully connected to ${databaseURL}`);
        } catch (e) {
            console.log("Error connecting to database: ", e.message);
            process.exit(1);
        }
    }
};
