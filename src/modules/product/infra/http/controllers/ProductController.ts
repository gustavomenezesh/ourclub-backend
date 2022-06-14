import AppContainer from '@common/container';
import AppError from '@common/errors/AppError';
import ParseZodValidationError from '@common/errors/ZodError';

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import CreateProductValidator from '@modules/product/infra/http/validators/CreateProductValidator';
import CreateProductService from '@modules/product/services/CreateProductService';

import ListProductValidator from '@modules/product/infra/http/validators/ListProductsValidator';
import ListProductsService from '@modules/product/services/ListProductsService';
import { instanceToPlain } from 'class-transformer';

class ProductController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = await CreateProductValidator.parseAsync(req.body).catch((err) => {
      throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    if (!req.files?.length) {
      throw new AppError('Images is missing in product', StatusCodes.BAD_REQUEST);
    }
    
    const filenames = req.files.map((file) => file.filename);

    const createProduct = AppContainer.resolve<CreateProductService>(CreateProductService);
    const product = await createProduct.execute({ filenames, data });

    return res.status(StatusCodes.CREATED).json({ id: product.id });
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const data = await ListProductValidator.parseAsync(req.query).catch((err) => {
      throw new AppError(ParseZodValidationError(err), StatusCodes.BAD_REQUEST);
    });

    const listProducts = AppContainer.resolve<ListProductsService>(ListProductsService);
    const products = await listProducts.execute({ data });

    return res.status(200).json(instanceToPlain(products));
  }
}

export default ProductController;
