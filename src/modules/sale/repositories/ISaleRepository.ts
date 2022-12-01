import Sale from '@modules/sale/infra/typeorm/entities/Sale';

import IUpdateSaleDTO from '@modules/sale/dtos/IUpdateSaleDTO';
import ICreateSaleDTO from '@modules/sale/dtos/ICreateSaleDTO';

interface ISaleRepository {
  create(data: ICreateSaleDTO): Promise<Sale>;
  find(where: object | object[], relations?: string[]): Promise<Sale | undefined>;
  list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number
  ): Promise<[Sale[], number]>;
  listByTitle(title: string): Promise<Sale[]>
  update(sale: Sale, data: IUpdateSaleDTO): Promise<Sale>;
  delete(id: number): Promise<boolean>;
}

export default ISaleRepository;
