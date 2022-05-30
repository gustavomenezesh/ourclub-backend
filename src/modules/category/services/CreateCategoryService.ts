import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';

import Schema from '@modules/category/infra/http/validators/CreateCategoryValidator';
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  data: Z.infer<typeof Schema>,
}

@injectable()
class CreateCategoryService {
  @inject(Types.CategoryRepository) private categoryRepository!: ICategoryRepository;

  public async execute({ data }: IRequest): Promise<Category> {
    const category = await this.categoryRepository.create(data);
    return category;
  }
}

export default CreateCategoryService;
