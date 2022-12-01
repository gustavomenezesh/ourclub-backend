import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import Tag from '../infra/typeorm/entities/Tag';
import ITagRepository from '../repositories/ITagRepository';

@injectable()
class ListTagService {
    @inject(Types.TagRepository) private tagRepository!: ITagRepository;

    public async execute(): Promise<Tag[]> {
        const [tags] = await this.tagRepository.list({ enabled: true });
        return tags;
    }
}

export default ListTagService;
