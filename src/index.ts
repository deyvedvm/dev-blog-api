import express from "express";
import morgan from 'morgan';
import config from 'config';

import database from './database';

const PORT = process.env.PORT || config.get('nodePort');

const app = express();

app.use(morgan('dev'));

database(config);

app.get('/', (req, res) => {
    res.send('API running');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

export default app;

