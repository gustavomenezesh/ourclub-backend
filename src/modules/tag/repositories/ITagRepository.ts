import ICreateTagDTO from '../dtos/ICreateTagDTO';
import IUpdateTagDTO from '../dtos/IUpdateTagDTO';
import Tag from '../infra/typeorm/entities/Tag';

interface ITagRepository {
    create(data: ICreateTagDTO): Promise<Tag>;
    find(where: object | object[], relations?: string[]): Promise<Tag | undefined>;
    list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Tag[], number]>;
    update(tag: Tag, data: IUpdateTagDTO): Promise<Tag>;
    delete(id: number): Promise<boolean>;
}

export default ITagRepository;
