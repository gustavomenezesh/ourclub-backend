import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';
import CreateSubCategoryValidator from '@modules/subcategory/infra/http/validators/CreateSubCategoryValidator';
import CreateSubCategoryService from '@modules/subcategory/services/CreateSubCategoryService';
import DeleteSubCategoryService from '@modules/subcategory/services/DeleteSubCategoryService';
import ListSubCategoryService from '@modules/subcategory/services/ListSubCategoryService';
import UpdateSubCategoryService from '@modules/subcategory/services/UpdateSubCategoryService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UpdateSubCategoryValidator from '../validators/UpdateSubCategoryValidator';

class SubCategoryController {
  public async list(req: Request, res: Response): Promise<Response> {

    const categoryId = +req.params.category;
    const createSubCategory = AppContainer.resolve<ListSubCategoryService>(ListSubCategoryService);
    const subCategories = await createSubCategory.execute(categoryId);

    return res.status(200).json(instanceToPlain(subCategories));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = await CreateSubCategoryValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    const createSubCategory = AppContainer.resolve<CreateSubCategoryService>(CreateSubCategoryService);
    const subCategory = await createSubCategory.execute({ data });

    return res.status(StatusCodes.CREATED).json({ id: subCategory.id });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = await UpdateSubCategoryValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    const subCategoryId = +req.params.subCategoryId;

    const updateSubCategory = AppContainer.resolve<UpdateSubCategoryService>(UpdateSubCategoryService);
    await updateSubCategory.execute({ subCategoryId, data });

    return res.status(StatusCodes.NO_CONTENT).json({});
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const subCategoryId = +req.params.subCategoryId;

    const deleteSubCategory = AppContainer.resolve<DeleteSubCategoryService>(DeleteSubCategoryService);
    await deleteSubCategory.execute({ subCategoryId });

    return res.status(StatusCodes.NO_CONTENT).json({});
  }
}

export default SubCategoryController;
