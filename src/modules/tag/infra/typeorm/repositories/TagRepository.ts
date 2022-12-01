import ICreateTagDTO from '@modules/tag/dtos/ICreateTagDTO';
import IUpdateTagDTO from '@modules/tag/dtos/IUpdateTagDTO';
import ITagRepository from '@modules/tag/repositories/ITagRepository';
import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import Tag from '../entities/Tag';

@injectable()
class TagRepository implements ITagRepository {
    private ormRepository = getConnection().getRepository(Tag);

    public async create(data: ICreateTagDTO): Promise<Tag> {
        const tag = this.ormRepository.create(data);
        return this.ormRepository.save(tag);
    }

    public async find(where: object | object[], relations?: string[]): Promise<Tag | undefined> {
        return this.ormRepository.findOne({ where, relations });
    }

    public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Tag[], number]> {
        return this.ormRepository.findAndCount({
            where, relations, take, skip,
        });
    }

    public async update(tag: Tag, data: IUpdateTagDTO): Promise<Tag> {
        this.ormRepository.merge(tag, data);
        return this.ormRepository.save(tag);
    }

    public async delete(id: number): Promise<boolean> {
        return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
    }
}

export default TagRepository;
