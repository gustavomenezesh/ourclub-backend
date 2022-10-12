import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import { inject, injectable } from 'inversify';
import IPromotionRepository from '../repositories/IPromotionRepository';

interface IRequest {
    promotionId: number,
}

@injectable()
class DeletePromotionService {
    @inject(Types.PromotionRepository) private promotionRepository!: IPromotionRepository;

    public async execute({ promotionId }: IRequest): Promise<void> {
        const promotionFound = await this.promotionRepository.find({ id: promotionId });
        if (!promotionFound) throw new AppError('Promotion not found', 404);

        await this.promotionRepository.update(promotionFound, { enabled: false });
    }
}

export default DeletePromotionService;

