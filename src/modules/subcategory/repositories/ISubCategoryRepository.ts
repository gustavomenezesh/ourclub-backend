import SubCategory from '@modules/subcategory/infra/typeorm/entities/SubCategory';

import IUpdateSubCategoryDTO from '@modules/subcategory/dtos/IUpdateSubCategoryDTO';
import ICreateSubCategoryDTO from '@modules/subcategory/dtos/ICreateSubCategoryDTO';

interface ISubCategoryRepository {
    create(data: ICreateSubCategoryDTO): Promise<SubCategory>;
    find(where: object | object[], relations?: string[]): Promise<SubCategory | undefined>;
    list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[SubCategory[], number]>;
    update(category: SubCategory, data: IUpdateSubCategoryDTO): Promise<SubCategory>;
    delete(id: number): Promise<boolean>;
}

export default ISubCategoryRepository;
