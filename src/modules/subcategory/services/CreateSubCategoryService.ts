import Types from '@common/container/types';
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

    public async execute({ data }: IRequest): Promise<SubCategory> {
        const subCategory = await this.subCategoryRepository.create(data);
        return subCategory;
    }
}

export default CreateSubCategoryService;
