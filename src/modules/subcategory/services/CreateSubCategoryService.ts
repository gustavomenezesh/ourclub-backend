import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import Schema from '@modules/subcategory/infra/http/validators/CreateSubCategoryValidator';
import ISubCategoryRepository from '@modules/subcategory/repositories/ISubCategoryRepository';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import SubCategory from '../infra/typeorm/entities/SubCategory';

interface IRequest {
    data: Z.infer<typeof Schema>,
}

@injectable()
class CreateSubCategoryService {
    @inject(Types.SubCategoryRepository) private subCategoryRepository!: ISubCategoryRepository;

    @inject(Types.CategoryRepository) private categoryRepository!: ICategoryRepository;

    public async execute({ data }: IRequest): Promise<SubCategory> {
      const categoryFound = await this.categoryRepository.find({ id: data.categoryId });
      if (!categoryFound) throw new AppError('Category not found!', 404);

      const subCategory = await this.subCategoryRepository.create(data);
      return subCategory;
    }
}

export default CreateSubCategoryService;
