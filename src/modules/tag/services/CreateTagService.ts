import Types from '@common/container/types';
import Schema from '@modules/tag/infra/http/validators/CreateTagValidator';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import Tag from '../infra/typeorm/entities/Tag';
import ITagRepository from '../repositories/ITagRepository';

interface IRequest {
    data: Z.infer<typeof Schema>,
}

@injectable()
class CreateTagService {
    @inject(Types.TagRepository) private tagRepository!: ITagRepository;

    public async execute({ data }: IRequest): Promise<Tag> {
        const tag = await this.tagRepository.create(data);
        return tag;
    }
}

export default CreateTagService;
