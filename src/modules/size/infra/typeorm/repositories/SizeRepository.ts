import ICreateSizeDTO from '@modules/size/dtos/ICreateSizeDTO';
import IUpdateSizeDTO from '@modules/size/dtos/IUpdateSizeDTO';
import ISizeRepository from '@modules/size/repositories/ISizeRepository';
import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import Size from '../entities/Size';

@injectable()
class SizeRepository implements ISizeRepository {
    private ormRepository = getConnection().getRepository(Size);

    public async create(data: ICreateSizeDTO): Promise<Size> {
        const size = this.ormRepository.create(data);
        return this.ormRepository.save(size);
    }

    public async find(where: object | object[], relations?: string[]): Promise<Size | undefined> {
        return this.ormRepository.findOne({ where, relations });
    }

    public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Size[], number]> {
        return this.ormRepository.findAndCount({
            where, relations, take, skip,
        });
    }

    public async update(size: Size, data: IUpdateSizeDTO): Promise<Size> {
        this.ormRepository.merge(size, data);
        return this.ormRepository.save(size);
    }

    public async delete(id: number): Promise<boolean> {
        return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
    }
}

export default SizeRepository;
