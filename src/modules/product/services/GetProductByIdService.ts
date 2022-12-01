import Types from '@common/container/types';

import { inject, injectable } from 'inversify';
import IResponse from '@modules/product/responses/IListProductsResponse';
import AppError from '@common/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  productId: number;
}

@injectable()
class GetProductByIdService {
  @inject(Types.ProductRepository) private productRepository!: IProductRepository;

  public async execute({ productId }: IRequest): Promise<IResponse | undefined> {
    const productFound = await this.productRepository.find({ id: productId, enabled: true }, ['images']);
    if (!productFound) throw new AppError('Product not found', StatusCodes.NOT_FOUND);

    return {
      id: productFound.id,
      title: productFound.title,
      value: productFound.value,
      description: productFound.description,
      gender: productFound.gender,
      images: productFound.images?.map((item) => ({
        url: item.url,
      })),
    };
  }
}

export default GetProductByIdService;
