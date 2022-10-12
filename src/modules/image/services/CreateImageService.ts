import Types from '@common/container/types';
import Schema from '@modules/image/infra/http/validators/CreateImageValidator';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import Image from '../infra/typeorm/entities/Image';
import IImageRepository from '../repositories/IImageRepository';

interface IRequest {
    data: Z.infer<typeof Schema>,
}

@injectable()
class CreateImageService {
    @inject(Types.ImageRepository) private imageRepository!: IImageRepository;

    public async execute({ data }: IRequest): Promise<Image> {
        const image = await this.imageRepository.create(data);
        return image;
    }
}

export default CreateImageService;
