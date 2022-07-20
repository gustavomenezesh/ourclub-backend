import ICreatePromotionDTO from '../dtos/ICreatePromotionDTO';
import IUpdatePromotionDTO from '../dtos/IUpdatePromotionDTO';
import Promotion from '../infra/typeorm/entities/Promotion';

interface IPromotionRepository {
    create(data: ICreatePromotionDTO): Promise<Promotion>;
    find(where: object | object[], relations?: string[]): Promise<Promotion | undefined>;
    list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Promotion[], number]>;
    update(promotion: Promotion, data: IUpdatePromotionDTO): Promise<Promotion>;
    delete(id: number): Promise<boolean>;
}

export default IPromotionRepository;
