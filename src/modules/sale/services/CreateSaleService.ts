import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import * as Z from 'zod';
import { StatusCodes } from 'http-status-codes';

import Schema from '@modules/sale/infra/http/validators/CreateSaleValidator';
import IProductRepository from '@modules/product/repositories/IProductRepository';
import IAdressRepository from '@modules/adress/repositories/IAdressRepository';

import ISizeRepository from '@modules/size/repositories/ISizeRepository';
import ISaleProductRepository from '../repositories/ISaleProductRepository';
import ISaleRepository from '../repositories/ISaleRepository';
import Sale from '../infra/typeorm/entities/Sale';

interface IRequest {
  data: Z.infer<typeof Schema>,
}

@injectable()
class CreateProductService {
    @inject(Types.SaleRepository) private saleRepository!: ISaleRepository;

    @inject(Types.SaleProductRepository) private saleProductRepository!: ISaleProductRepository;

    @inject(Types.ProductRepository) private productRepository!: IProductRepository;

    @inject(Types.AdressRepository) private adressRepository!: IAdressRepository;

    @inject(Types.SizeRepository) private sizeRepository!: ISizeRepository;

    public async execute({ data }: IRequest): Promise<Sale> {
      if (!await this.adressRepository.find({ id: data.adressId })) {
        throw new AppError('Adress not found!', StatusCodes.NOT_FOUND);
      }

      const saleBody = {
        userId: data.userId,
        adressId: data.adressId,
        description: data.description,
        code: uuidv4(),
        total: data.total,
        paymentType: data.paymentType,
      };

      const sale = await this.saleRepository.create(saleBody);
      const errors: String[] = [];
      Promise.all(data.productsSize.map(async (productSize) => {
        if (
          !(await this.productRepository.find({ id: productSize.product })
          && await this.sizeRepository.find({ id: productSize.size }))
        ) {
          errors.push('Could not insert the product in the Sale');
        } else {
          await this.saleProductRepository.create({
            saleId: sale.id,
            productId: productSize.product,
            sizeId: productSize.size,
          });
        }
      }));
      if (errors.length > 0) {
        await this.saleRepository.delete(sale.id);
        throw new AppError(errors[0], 404);
      }
      return sale;
    }
}

export default CreateProductService;
