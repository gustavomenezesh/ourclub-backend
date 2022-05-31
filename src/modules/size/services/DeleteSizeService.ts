import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import { inject, injectable } from 'inversify';
import ISizeRepository from '../repositories/ISizeRepository';

interface IRequest {
    sizeId: number,
}

@injectable()
class DeleteSizeService {
    @inject(Types.SizeRepository) private sizeRepository!: ISizeRepository;

    public async execute({ sizeId }: IRequest): Promise<void> {
        const sizeFound = await this.sizeRepository.find({ id: sizeId });
        if (!sizeFound) throw new AppError('Size not found', 404);

        await this.sizeRepository.update(sizeFound, { enabled: false });
    }
}

export default DeleteSizeService;

