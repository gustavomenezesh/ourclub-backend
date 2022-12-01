import Product from '@modules/product/infra/typeorm/entities/Product';

import IUpdateProductDTO from '@modules/product/dtos/IUpdateProductDTO';
import ICreateProductDTO from '@modules/product/dtos/ICreateProductDTO';

interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  find(where: object | object[], relations?: string[]): Promise<Product | undefined>;
  list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number
  ): Promise<[Product[], number]>;
  listByTitle(title: string): Promise<Product[]>
  update(product: Product, data: IUpdateProductDTO): Promise<Product>;
  delete(id: number): Promise<boolean>;
}

export default IProductRepository;
