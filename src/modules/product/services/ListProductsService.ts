import Types from '@common/container/types';

import Schema from '@modules/product/infra/http/validators/CreateProductValidator';
import ISubCategoryRepository from '@modules/subcategory/repositories/ISubCategoryRepository';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
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
      const subcategProducts = await this.subCategoryRepository.list({ id: Number(data.subCategoryId), enabled: true }, ['products', 'products.images']);
      console.log(subcategProducts);
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
}

export default ListProductsService;
