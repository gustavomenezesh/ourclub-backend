import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import SaleProduct from '@modules/sale/infra/typeorm/entities/SaleProducts';
import ISaleProductRepository from '@modules/sale/repositories/ISaleProductRepository';

import IUpdateSaleProductDTO from '@modules/sale/dtos/IUpdateSaleProductDTO';
import ICreateSaleProductDTO from '@modules/sale/dtos/ICreateSaleProductDTO';

@injectable()
class SaleProductRepository implements ISaleProductRepository {
  private ormRepository = getConnection().getRepository(SaleProduct);

  public async create(data: ICreateSaleProductDTO): Promise<SaleProduct> {
    const saleProduct = this.ormRepository.create(data);
    return this.ormRepository.save(saleProduct);
  }

  public async find(
    where: object | object[],
    relations?: string[],
  ): Promise<SaleProduct | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[SaleProduct[], number]> {
    return this.ormRepository.findAndCount({
      where, relations, take, skip,
    });
  }

  public async listByTitle(title: string): Promise<SaleProduct[]> {
    return this.ormRepository.createQueryBuilder('produto')
      .where('produto.ativo = true')
      .andWhere('produto.titulo ILIKE :title', { title: `%${title}%` })
      .getMany();
  }

  public async update(saleProduct: SaleProduct, data: IUpdateSaleProductDTO): Promise<SaleProduct> {
    this.ormRepository.merge(saleProduct, data);
    return this.ormRepository.save(saleProduct);
  }

  public async delete(id: number): Promise<boolean> {
    return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
  }
}

export default SaleProductRepository;
