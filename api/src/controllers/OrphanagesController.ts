import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '@models/Orphanage';
import orphanagesView from '@views/orphanagesView';
import * as Yup from 'yup';

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.find({
      relations: ['images'],
    });

    return response.json(orphanagesView.renderMany(orphanage));
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.json(orphanagesView.render(orphanage));
  },

  async create(request: Request, response: Response): Promise<Orphanage | any> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: openOnWeekendsOnString,
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename };
    });

    const orphanagesRepository = getRepository(Orphanage);

    const open_on_weekends = JSON.parse(openOnWeekendsOnString);
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'), // Para personalizar mensagem
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });
    await schema.validate(data, {
      abortEarly: false,
    });
    const orphanage = orphanagesRepository.create(data);
    await orphanagesRepository.save(orphanage);
    return response.status(201).json(orphanage);
  },
};
