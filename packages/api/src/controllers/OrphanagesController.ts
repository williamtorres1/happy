import { Request, Response } from 'express';

import { getRepository } from 'typeorm';

import Orphanage from '@models/Orphanage';

export default {
  async index(request: Request, response: Response) {
    try {
      const orphanagesRepository = getRepository(Orphanage);

      const orphanages = await orphanagesRepository.find();

      return response.json(orphanages);
    } catch (err) {
      return response.json({ error: err.message });
    }
  },
  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const orphanagesRepository = getRepository(Orphanage);

      const orphanages = await orphanagesRepository.findOneOrFail(id);

      return response.json(orphanages);
    } catch (err) {
      return response.json({ error: err.message });
    }
  },

  async create(request: Request, response: Response): Promise<Orphanage | any> {
    try {
      const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
      } = request.body;

      const requestImages = request.files as Express.Multer.File[];

      const images = requestImages.map(image => {
        return { path: image.filename };
      });

      const orphanagesRepository = getRepository(Orphanage);

      const orphanage = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        images,
      });
      await orphanagesRepository.save(orphanage);
      return response.status(201).json(orphanage);
    } catch (err) {
      return response.json({ error: err.message });
    }
  },
};
