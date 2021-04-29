import { Router } from 'express';
import multer from 'multer';

import OrphanagesController from '@controllers/OrphanagesController';
import uploadConfig from '@config/upload';

const orphanageRouter = Router();
const upload = multer(uploadConfig);

orphanageRouter.get('/', OrphanagesController.index);
orphanageRouter.get('/:id', OrphanagesController.show);
orphanageRouter.post('/', upload.array('images'), OrphanagesController.create);

export default orphanageRouter;
