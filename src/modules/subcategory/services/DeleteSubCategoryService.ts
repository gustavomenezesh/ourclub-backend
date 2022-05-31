import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import { inject, injectable } from 'inversify';
import ISubCategoryRepository from '../repositories/ISubCategoryRepository';

interface IRequest {
    subCategoryId: number,
}

@injectable()
class DeleteSubCategoryService {
    @inject(Types.SubCategoryRepository) private subCategoryRepository!: ISubCategoryRepository;

    public async execute({ subCategoryId }: IRequest): Promise<void> {
        const subCategoryFound = await this.subCategoryRepository.find({ id: subCategoryId });
        if (!subCategoryFound) throw new AppError('Subcategory not found', 404);

        await this.subCategoryRepository.update(subCategoryFound, { enabled: false });
    }
}

export default DeleteSubCategoryService;

