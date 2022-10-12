import ICreateSubCategoryDTO from '@modules/subcategory/dtos/ICreateSubCategoryDTO';
import IUpdateSubCategoryDTO from '@modules/subcategory/dtos/IUpdateSubCategoryDTO';
import ISubCategoryRepository from '@modules/subcategory/repositories/ISubCategoryRepository';
import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import SubCategory from '../entities/SubCategory';

@injectable()
class SubCategoryRepository implements ISubCategoryRepository {
    private ormRepository = getConnection().getRepository(SubCategory);

    public async create(data: ICreateSubCategoryDTO): Promise<SubCategory> {
        const subCategory = this.ormRepository.create(data);
        return this.ormRepository.save(subCategory);
    }

    public async find(where: object | object[], relations?: string[]): Promise<SubCategory | undefined> {
        return this.ormRepository.findOne({ where, relations });
    }

    public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[SubCategory[], number]> {
        return this.ormRepository.findAndCount({
            where, relations, take, skip,
        });
    }

    public async update(subCategory: SubCategory, data: IUpdateSubCategoryDTO): Promise<SubCategory> {
        this.ormRepository.merge(subCategory, data);
        return this.ormRepository.save(subCategory);
    }

    public async delete(id: number): Promise<boolean> {
        return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
    }
}

export default SubCategoryRepository;
