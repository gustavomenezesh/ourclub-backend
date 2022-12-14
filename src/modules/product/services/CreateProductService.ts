import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import storageConfig from '@config/StorageConfig';
import IImageRepository from '@modules/image/repositories/IImageRepository';

import Schema from '@modules/product/infra/http/validators/CreateProductValidator';
import ISubCategoryRepository from '@modules/subcategory/repositories/ISubCategoryRepository';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  filenames: string[];
  data: Z.infer<typeof Schema>,
}

@injectable()
class CreateProductService {
    @inject(Types.SubCategoryRepository) private subCategoryRepository!: ISubCategoryRepository;

    @inject(Types.ProductRepository) private productRepository!: IProductRepository;

    @inject(Types.ImageRepository) private imageRepository!: IImageRepository;

    public async execute({ filenames, data }: IRequest): Promise<Product> {
      const subCategoryFound = await this.subCategoryRepository.find({ id: data.subCategoryId });
      if (!subCategoryFound) throw new AppError('Category not found!', 404);
      const body = {
        subCategoryId: Number(data.subCategoryId),
        title: data.title,
        value: Number(data.value),
        description: data.description,
        gender: data.gender,
      };
      try {
        const product = await this.productRepository.create(body);
        filenames.forEach(async (filename) => {
          const form = new FormData();
          form.append('file', fs.createReadStream(`temp/${filename}`));
          axios({
            method: 'post',
            url: 'http://ec2-3-12-152-137.us-east-2.compute.amazonaws.com/api/v1/files/upload',
            data: form,
            headers: { 'Content-Type': 'multipart/form-data' },
          }).then(async (response) => {
            console.log(response);
            const { size } = fs.statSync(`${storageConfig.local.tempFolder}/${filename}`);
            await this.imageRepository.create({
              productId: product.id,
              url: `api/${storageConfig.local.uploadFolder}/${filename}`,
              token: filename.split('.')[0],
              size: String(size),
            });
          }).catch((response) => {
            console.log(response);
          });
        });
        return product;
      } catch (e: any) {
        throw new AppError(e, 500);
      }
    }
}

export default CreateProductService;
