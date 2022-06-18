import ICreatePersonalizationDTO from '../dtos/ICreatePersonalizationDTO';
import IUpdatePersonalizationDTO from '../dtos/IUpdatePersonalizationDTO';
import Personalization from '../infra/typeorm/entities/Personalization';

interface IPersonalizationRepository {
    create(data: ICreatePersonalizationDTO): Promise<Personalization>;
    find(where: object | object[], relations?: string[]): Promise<Personalization | undefined>;
    list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Personalization[], number]>;
    update(personalization: Personalization, data: IUpdatePersonalizationDTO): Promise<Personalization>;
    delete(id: number): Promise<boolean>;
}

export default IPersonalizationRepository;
