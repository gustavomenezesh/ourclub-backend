import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';

import CreateUserValidator from '@modules/user/infra/http/validators/CreateUserValidator';
import CreateUserService from '@modules/user/services/CreateUserService';

class UserController {
  public async create(req:Request, res:Response): Promise<Response> {
    const data = await CreateUserValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    const createUser = AppContainer.resolve<CreateUserService>(CreateUserService);
    const user = await createUser.execute({ data });

    return res.status(StatusCodes.CREATED).json({ id: user.id });
  }
}

export default UserController;
