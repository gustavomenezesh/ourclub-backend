import ICreatePromotionDTO from '@modules/promotion/dtos/ICreatePromotionDTO';
import IUpdatePromotionDTO from '@modules/promotion/dtos/IUpdatePromotionDTO';
import IPromotionRepository from '@modules/promotion/repositories/IPromotionRepository';
import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import Promotion from '../entities/Promotion';

@injectable()
class PromotionRepository implements IPromotionRepository {
    private ormRepository = getConnection().getRepository(Promotion);

    public async create(data: ICreatePromotionDTO): Promise<Promotion> {
        const promotion = this.ormRepository.create(data);
        return this.ormRepository.save(promotion);
    }

    public async find(where: object | object[], relations?: string[]): Promise<Promotion | undefined> {
        return this.ormRepository.findOne({ where, relations });
    }

    public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Promotion[], number]> {
        return this.ormRepository.findAndCount({
            where, relations, take, skip,
        });
    }

    public async update(promotion: Promotion, data: IUpdatePromotionDTO): Promise<Promotion> {
        this.ormRepository.merge(promotion, data);
        return this.ormRepository.save(promotion);
    }

    public async delete(id: number): Promise<boolean> {
        return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
    }
}

export default PromotionRepository;
