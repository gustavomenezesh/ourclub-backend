import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';

import Schema from '@modules/category/infra/http/validators/UpdateCategoryValidator';
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import AppError from '@common/errors/AppError';

interface IRequest {
  categoryId: number,
  data: Z.infer<typeof Schema>,
}

@injectable()
class UpdateCategoryService {
  @inject(Types.CategoryRepository) private categoryRepository!: ICategoryRepository;

  public async execute({ categoryId, data }: IRequest): Promise<void> {
    const categoryFound = await this.categoryRepository.find({ id: categoryId });
    if (!categoryFound) throw new AppError('Category not found', 404);

    await this.categoryRepository.update(categoryFound, data);
  }
}

export default UpdateCategoryService;
