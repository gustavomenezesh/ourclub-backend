import Types from '@common/container/types';
import { inject, injectable } from 'inversify';

import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import Category from '../infra/typeorm/entities/Category';

@injectable()
class ListUserService {
  @inject(Types.CategoryRepository) private categoryRepository!: ICategoryRepository;

  public async execute(): Promise<Category[]> {
    const [categories] = await this.categoryRepository.list({ enabled: true });
    return categories;
  }
}

export default ListUserService;
