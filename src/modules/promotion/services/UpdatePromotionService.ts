import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import Schema from '@modules/promotion/infra/http/validators/UpdatePromotionValidator';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import IPromotionRepository from '../repositories/IPromotionRepository';

interface IRequest {
    promotionId: number,
    data: Z.infer<typeof Schema>,
}

@injectable()
class UpdatePromotionService {
    @inject(Types.PromotionRepository) private promotionRepository!: IPromotionRepository;

    public async execute({ promotionId, data }: IRequest): Promise<void> {
        const promotionFound = await this.promotionRepository.find({ id: promotionId });
        if (!promotionFound) throw new AppError('Promotion not found', 404);

        await this.promotionRepository.update(promotionFound, data);
    }
}

export default UpdatePromotionService;
