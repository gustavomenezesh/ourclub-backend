import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import Image from '../infra/typeorm/entities/Image';
import IImageRepository from '../repositories/IImageRepository';

@injectable()
class ListImageService {
    @inject(Types.ImageRepository) private imageRepository!: IImageRepository;

    public async execute(): Promise<Image[]> {
        const [images] = await this.imageRepository.list({ enabled: true });
        return images;
    }
}

export default ListImageService;
