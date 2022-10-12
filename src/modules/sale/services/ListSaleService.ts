import Types from '@common/container/types';
import { inject, injectable } from 'inversify';

import ISaleRepository from '../repositories/ISaleRepository';
import Sale from '../infra/typeorm/entities/Sale';

@injectable()
class CreateProductService {
    @inject(Types.SaleRepository) private saleRepository!: ISaleRepository;

    public async execute(userId: string): Promise<Sale[]> {
      const [sales] = await this.saleRepository.list(userId ? { userId, enabled: true } : { enabled: true }, ['delivery', 'adress', 'saleProducts', 'saleProducts.product', 'saleProducts.size', 'saleProducts.personalization']);
      return sales;
    }
}

export default CreateProductService;
