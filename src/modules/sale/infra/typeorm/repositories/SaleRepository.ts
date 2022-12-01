import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import Sale from '@modules/sale/infra/typeorm/entities/Sale';
import ISaleRepository from '@modules/sale/repositories/ISaleRepository';

import IUpdateSaleDTO from '@modules/sale/dtos/IUpdateSaleDTO';
import ICreateSaleDTO from '@modules/sale/dtos/ICreateSaleDTO';

@injectable()
class SaleRepository implements ISaleRepository {
  private ormRepository = getConnection().getRepository(Sale);

  public async create(data: ICreateSaleDTO): Promise<Sale> {
    const sale = this.ormRepository.create(data);
    return this.ormRepository.save(sale);
  }

  public async find(where: object | object[], relations?: string[]): Promise<Sale | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[Sale[], number]> {
    return this.ormRepository.findAndCount({
      where, relations, take, skip,
    });
  }

  public async listByTitle(title: string): Promise<Sale[]> {
    return this.ormRepository.createQueryBuilder('produto')
      .where('produto.ativo = true')
      .andWhere('produto.titulo ILIKE :title', { title: `%${title}%` })
      .getMany();
  }

  public async update(sale: Sale, data: IUpdateSaleDTO): Promise<Sale> {
    this.ormRepository.merge(sale, data);
    return this.ormRepository.save(sale);
  }

  public async delete(id: number): Promise<boolean> {
    return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
  }
}

export default SaleRepository;
