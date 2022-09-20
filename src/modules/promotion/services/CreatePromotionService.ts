import Types from '@common/container/types';
import Schema from '@modules/promotion/infra/http/validators/CreatePromotionValidator';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import Promotion from '../infra/typeorm/entities/Promotion';
import IPromotionRepository from '../repositories/IPromotionRepository';

interface IRequest {
    data: Z.infer<typeof Schema>,
}

@injectable()
class CreatePromotionService {
    @inject(Types.PromotionRepository) private promotionRepository!: IPromotionRepository;

    public async execute({ data }: IRequest): Promise<Promotion> {
        const promotion = await this.promotionRepository.create(data);
        return promotion;
    }
}

export default CreatePromotionService;
