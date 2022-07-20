import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import Promotion from '../infra/typeorm/entities/Promotion';
import IPromotionRepository from '../repositories/IPromotionRepository';

@injectable()
class ListPromotionService {
    @inject(Types.PromotionRepository) private promotionRepository!: IPromotionRepository;

    public async execute(): Promise<Promotion[]> {
        const [promotions] = await this.promotionRepository.list({ enabled: true });
        return promotions;
    }
}

export default ListPromotionService;
