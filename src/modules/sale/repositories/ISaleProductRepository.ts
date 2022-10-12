import SaleProduct from '@modules/sale/infra/typeorm/entities/SaleProducts';

import IUpdateSaleProductDTO from '@modules/sale/dtos/IUpdateSaleProductDTO';
import ICreateSaleProductDTO from '@modules/sale/dtos/ICreateSaleProductDTO';

interface ISaleProductRepository {
  create(data: ICreateSaleProductDTO): Promise<SaleProduct>;
  find(where: object | object[], relations?: string[]): Promise<SaleProduct | undefined>;
  list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number
  ): Promise<[SaleProduct[], number]>;
  listByTitle(title: string): Promise<SaleProduct[]>
  update(saleProduct: SaleProduct, data: IUpdateSaleProductDTO): Promise<SaleProduct>;
  delete(id: number): Promise<boolean>;
}

export default ISaleProductRepository;
