import Category from '@modules/category/infra/typeorm/entities/Category';

import IUpdateCategoryDTO from '@modules/category/dtos/IUpdateCategoryDTO';
import ICreateCategoryDTO from '@modules/category/dtos/ICreateCategoryDTO';

interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  find(where: object | object[], relations?: string[]): Promise<Category | undefined>;
  list(
    where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number
  ): Promise<[Category[], number]>;
  update(category: Category, data: IUpdateCategoryDTO): Promise<Category>;
  delete(id: number): Promise<boolean>;
}

export default ICategoryRepository;
