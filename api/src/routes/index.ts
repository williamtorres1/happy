import { Router } from 'express';

import orphanageRouter from './orphanages.routes';

const routes = Router();

routes.use('/orphanages', orphanageRouter);

export default routes;
