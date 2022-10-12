import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import Schema from '@modules/tag/infra/http/validators/UpdateTagValidator';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import ITagRepository from '../repositories/ITagRepository';

interface IRequest {
    tagId: number,
    data: Z.infer<typeof Schema>,
}

@injectable()
class UpdateTagService {
    @inject(Types.TagRepository) private tagRepository!: ITagRepository;

    public async execute({ tagId, data }: IRequest): Promise<void> {
        const tagFound = await this.tagRepository.find({ id: tagId });
        if (!tagFound) throw new AppError('Tag not found', 404);

        await this.tagRepository.update(tagFound, data);
    }
}

export default UpdateTagService;
