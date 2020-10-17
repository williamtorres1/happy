import express from 'express';
import 'express-async-errors';
import path from 'path';
// connect with database
import './database/connection';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

export default app;
