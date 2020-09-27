import path from 'path';
import express from 'express';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
const host = process.env.HOST ? process.env.HOST : '127.0.0.1';

app.use(express.static(path.resolve(__dirname, '..')));

app.listen(port, host);
