import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import Category from '@modules/category/infra/typeorm/entities/Category';
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';

import IUpdateCategoryDTO from '@modules/category/dtos/IUpdateCategoryDTO';
import ICreateCategoryDTO from '@modules/category/dtos/ICreateCategoryDTO';

@injectable()
class CategoryRepository implements ICategoryRepository {
  private ormRepository = getConnection().getRepository(Category);

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(data);
    return this.ormRepository.save(category);
  }

  public async find(where: object | object[], relations?: string[]): Promise<Category | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number,
  ): Promise<[Category[], number]> {
    return this.ormRepository.findAndCount({
      where, relations, take, skip,
    });
  }

  public async update(category: Category, data: IUpdateCategoryDTO): Promise<Category> {
    this.ormRepository.merge(category, data);
    return this.ormRepository.save(category);
  }

  public async delete(id: number): Promise<boolean> {
    return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
  }
}

export default CategoryRepository;
