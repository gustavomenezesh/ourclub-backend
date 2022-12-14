import Types from '@common/container/types';

import Schema from '@modules/product/infra/http/validators/ListProductsValidator';
import ISubCategoryRepository from '@modules/subcategory/repositories/ISubCategoryRepository';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import fs from 'fs';
import http from 'http';
import IResponse from '@modules/product/responses/IListProductsResponse';
import IImageRepository from '@modules/image/repositories/IImageRepository';
import IProductRepository from '../repositories/IProductRepository';

interface IRequest {
  data: Z.infer<typeof Schema>,
}

@injectable()
class ListProductsService {
    @inject(Types.SubCategoryRepository) private subCategoryRepository!: ISubCategoryRepository;

    @inject(Types.ProductRepository) private productRepository!: IProductRepository;

    @inject(Types.ImageRepository) private imageRepository!: IImageRepository;

    public async execute({ data }: IRequest): Promise<IResponse[] | undefined> {
      if (data.title) {
        const products = await this.productRepository.listByTitle(data.title);
        if (products.length === 0) return [];
        const response = products?.map(async (product) => this.imageRepository
          .list({ productId: product.id, enabled: true }, [])
          .then((image) => ({
            id: product.id,
            title: product.title,
            value: product.value,
            description: product.description,
            gender: product.gender,
            images: image[0].map((item) => ({
              url: item.url,
            })),
          })));
        return Promise.all(response).then((results) => results);
      }
      if (data.subCategoryId) {
        const subcategProducts = await this.subCategoryRepository.list({ id: Number(data.subCategoryId), enabled: true }, ['products', 'products.images']);
        if (subcategProducts[0].length === 0) return [];
        const products = subcategProducts[0][0]
          .products?.filter((product) => product.enabled === true);

        return products?.map((product) => (
          {
            id: product.id,
            title: product.title,
            value: product.value,
            description: product.description,
            gender: product.gender,
            images: product.images?.map((image) => ({
              url: image.url,
            }
            )),
          }
        ));
      }

      const [products] = await this.productRepository.list({ enabled: true }, ['images']);
      if (products.length === 0) return [];
      return products?.map((product) => (
        {
          id: product.id,
          title: product.title,
          value: product.value,
          description: product.description,
          gender: product.gender,
          images: product.images?.map((image) => {
            const file = fs.createWriteStream(`temp/${image.url.split('/')[2]}`);
            http.get(
              `http://ec2-3-12-152-137.us-east-2.compute.amazonaws.com/${image.url}`,
              (response) => {
                response.pipe(file);
              },
            );
            return {
              url: image.url,
            };
          }),
        }
      ));
    }
}

export default ListProductsService;
