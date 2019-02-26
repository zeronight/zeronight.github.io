import path from 'path';
import express from 'express';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

app.use(express.static(path.resolve(__dirname, '..')));

app.listen(port);
