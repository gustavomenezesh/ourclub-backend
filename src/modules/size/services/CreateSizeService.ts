import Types from '@common/container/types';
import Schema from '@modules/size/infra/http/validators/CreateSizeValidator';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import Size from '../infra/typeorm/entities/Size';
import ISizeRepository from '../repositories/ISizeRepository';

interface IRequest {
    data: Z.infer<typeof Schema>,
}

@injectable()
class CreateSizeService {
    @inject(Types.SizeRepository) private sizeRepository!: ISizeRepository;

    public async execute({ data }: IRequest): Promise<Size> {
        const size = await this.sizeRepository.create(data);
        return size;
    }
}

export default CreateSizeService;
