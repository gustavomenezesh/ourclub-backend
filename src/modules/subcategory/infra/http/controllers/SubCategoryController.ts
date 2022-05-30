import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';

import CreateSubCategoryValidator from '@modules/subcategory/infra/http/validators/CreateSubCategoryValidator';
import CreateCategoryService from '@modules/subcategory/services/CreateSubCategoryService';

class SubCategoryController {
    public async create(req: Request, res: Response): Promise<Response> {
        const data = await CreateSubCategoryValidator.parseAsync(req.body).catch((err) => {
            throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
        });

        const createSubCategory = AppContainer.resolve<CreateCategoryService>(CreateCategoryService);
        const subCategory = await createSubCategory.execute({ data });

        return res.status(StatusCodes.CREATED).json({ id: subCategory.id });
    }
}

export default SubCategoryController;
