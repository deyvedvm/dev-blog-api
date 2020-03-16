import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('API running');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

export default app;

