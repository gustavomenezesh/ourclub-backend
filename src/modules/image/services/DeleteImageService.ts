import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import { inject, injectable } from 'inversify';
import IImageRepository from '../repositories/IImageRepository';

interface IRequest {
    imageId: number,
}

@injectable()
class DeleteImageService {
    @inject(Types.ImageRepository) private imageRepository!: IImageRepository;

    public async execute({ imageId }: IRequest): Promise<void> {
        const imageFound = await this.imageRepository.find({ id: imageId });
        if (!imageFound) throw new AppError('Image not found', 404);

        await this.imageRepository.update(imageFound, { enabled: false });
    }
}

export default DeleteImageService;

