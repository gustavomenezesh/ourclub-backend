import { Request, Response } from 'express';

import AppError from '@common/errors/AppError';
import AppContainer from '@common/container';

import CreateAdressService from '@modules/adress/services/CreateAdressService';
import CreateAdressValidator from '@modules/adress/infra/http/validators/CreateAdressValidator';

class AdressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = await CreateAdressValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(`Validation error: ${err.message}`, 400);
    });

    const createAdressService = AppContainer.resolve<CreateAdressService>(CreateAdressService);
    const response = await createAdressService.execute({ data });

    return res.status(201).json(response);
  }
}

export default AdressController;
