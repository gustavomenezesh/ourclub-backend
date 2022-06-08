import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import { inject, injectable } from 'inversify';
import ITagRepository from '../repositories/ITagRepository';

interface IRequest {
    tagId: number,
}

@injectable()
class DeleteTagService {
    @inject(Types.TagRepository) private tagRepository!: ITagRepository;

    public async execute({ tagId }: IRequest): Promise<void> {
        const tagFound = await this.tagRepository.find({ id: tagId });
        if (!tagFound) throw new AppError('Tag not found', 404);

        await this.tagRepository.update(tagFound, { enabled: false });
    }
}

export default DeleteTagService;

