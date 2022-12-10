import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';
import { instanceToPlain } from 'class-transformer';

import CreateCategoryValidator from '@modules/category/infra/http/validators/CreateCategoryValidator';
import UpdateCategoryValidator from '@modules/category/infra/http/validators/UpdateCategoryValidator';

import CreateCategoryService from '@modules/category/services/CreateCategoryService';
import UpdateCategoryService from '@modules/category/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/category/services/DeleteCategoryService';

import ListCategoryService from '@modules/category/services/ListCategoriesService';

class CategoryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = await CreateCategoryValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    const createCategory = AppContainer.resolve<CreateCategoryService>(CreateCategoryService);
    const category = await createCategory.execute({ data });

    return res.status(StatusCodes.CREATED).json({ id: category.id });
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const createCategory = AppContainer.resolve<ListCategoryService>(ListCategoryService);
    const categories = await createCategory.execute();

    return res.status(200).json(instanceToPlain(categories));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = await UpdateCategoryValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    const categoryId = +req.params.categoryId;

    const updateCategory = AppContainer.resolve<UpdateCategoryService>(UpdateCategoryService);
    await updateCategory.execute({ categoryId, data });

    return res.status(StatusCodes.NO_CONTENT).json({});
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const categoryId = +req.params.categoryId;

    const deleteCategory = AppContainer.resolve<DeleteCategoryService>(DeleteCategoryService);
    await deleteCategory.execute({ categoryId });

    return res.status(StatusCodes.NO_CONTENT).json({});
  }
}

export default CategoryController;
