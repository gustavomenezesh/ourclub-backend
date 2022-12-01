import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import Size from '../infra/typeorm/entities/Size';
import ISizeRepository from '../repositories/ISizeRepository';

@injectable()
class ListSizeService {
    @inject(Types.SizeRepository) private sizeRepository!: ISizeRepository;

    public async execute(): Promise<Size[]> {
        const [sizes] = await this.sizeRepository.list({ enabled: true });
        return sizes;
    }
}

export default ListSizeService;
