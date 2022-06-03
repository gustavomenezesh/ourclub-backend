import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import Schema from '@modules/image/infra/http/validators/UpdateImageValidator';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import IImageRepository from '../repositories/IImageRepository';

interface IRequest {
    imageId: number,
    data: Z.infer<typeof Schema>,
}

@injectable()
class UpdateImageService {
    @inject(Types.ImageRepository) private imageRepository!: IImageRepository;

    public async execute({ imageId, data }: IRequest): Promise<void> {
        const imageFound = await this.imageRepository.find({ id: imageId });
        if (!imageFound) throw new AppError('Image not found', 404);

        await this.imageRepository.update(imageFound, data);
    }
}

export default UpdateImageService;
