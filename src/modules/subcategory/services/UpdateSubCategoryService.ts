import Types from '@common/container/types';
import AppError from '@common/errors/AppError';
import Schema from '@modules/category/infra/http/validators/UpdateCategoryValidator';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import ISubCategoryRepository from '../repositories/ISubCategoryRepository';

interface IRequest {
    subCategoryId: number,
    data: Z.infer<typeof Schema>,
}

@injectable()
class UpdateSubCategoryService {
    @inject(Types.SubCategoryRepository) private subCategoryRepository!: ISubCategoryRepository;

    public async execute({ subCategoryId, data }: IRequest): Promise<void> {
        const subCategoryFound = await this.subCategoryRepository.find({ id: subCategoryId });
        if (!subCategoryFound) throw new AppError('Subcategory not found', 404);

        await this.subCategoryRepository.update(subCategoryFound, data);
    }
}

export default UpdateSubCategoryService;
