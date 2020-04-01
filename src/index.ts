import express from "express";
import morgan from 'morgan';
import config from 'config';

import users from './routes/users';

import database from './database';

const PORT = process.env.PORT || config.get('nodePort');

const app = express();

app.use(morgan('dev'));
app.use('/api/users', users);

database(config);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

export default app;

