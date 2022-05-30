import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';

import CreateCategoryValidator from '@modules/category/infra/http/validators/CreateCategoryValidator';
import CreateCategoryService from '@modules/category/services/CreateCategoryService';

class CategoryController {
  public async create(req:Request, res:Response): Promise<Response> {
    const data = await CreateCategoryValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    const createCategory = AppContainer.resolve<CreateCategoryService>(CreateCategoryService);
    const category = await createCategory.execute({ data });

    return res.status(StatusCodes.CREATED).json({ id: category.id });
  }
}

export default CategoryController;
