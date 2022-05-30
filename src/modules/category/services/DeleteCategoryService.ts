import Types from '@common/container/types';
import { inject, injectable } from 'inversify';

import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import AppError from '@common/errors/AppError';

interface IRequest {
  categoryId: number,
}

@injectable()
class DeleteCategoryService {
  @inject(Types.CategoryRepository) private categoryRepository!: ICategoryRepository;

  public async execute({ categoryId }: IRequest): Promise<void> {
    const categoryFound = await this.categoryRepository.find({ id: categoryId });
    if (!categoryFound) throw new AppError('Category not found', 404);

    await this.categoryRepository.update(categoryFound, { enabled: false });
  }
}

export default DeleteCategoryService;
