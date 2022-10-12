import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import Product from '@modules/product/infra/typeorm/entities/Product';
import IProductRepository from '@modules/product/repositories/IProductRepository';

import IUpdateProductDTO from '@modules/product/dtos/IUpdateProductDTO';
import ICreateProductDTO from '@modules/product/dtos/ICreateProductDTO';

@injectable()
class ProductRepository implements IProductRepository {
  private ormRepository = getConnection().getRepository(Product);

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);
    return this.ormRepository.save(product);
  }

  public async find(where: object | object[], relations?: string[]): Promise<Product | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[Product[], number]> {
    return this.ormRepository.findAndCount({
      where, relations, take, skip,
    });
  }

  public async listByTitle(title: string): Promise<Product[]> {
    return this.ormRepository.createQueryBuilder('produto')
      .where('produto.ativo = true')
      .andWhere('produto.titulo ILIKE :title', { title: `%${title}%` })
      .getMany();
  }

  public async update(product: Product, data: IUpdateProductDTO): Promise<Product> {
    this.ormRepository.merge(product, data);
    return this.ormRepository.save(product);
  }

  public async delete(id: number): Promise<boolean> {
    return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
  }
}

export default ProductRepository;
