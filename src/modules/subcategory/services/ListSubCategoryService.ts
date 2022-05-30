import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import SubCategory from '../infra/typeorm/entities/SubCategory';
import ISubCategoryRepository from '../repositories/ISubCategoryRepository';

@injectable()
class ListSubCategoryService {
    @inject(Types.SubCategoryRepository) private subCategoryRepository!: ISubCategoryRepository;

    public async execute(): Promise<SubCategory[]> {
        const [subCategories] = await this.subCategoryRepository.list({ enabled: true });
        return subCategories;
    }
}

export default ListSubCategoryService;
