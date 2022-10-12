import ICreateSizeDTO from "../dtos/ICreateSizeDTO";
import IUpdateSizeDTO from "../dtos/IUpdateSizeDTO";
import Size from "../infra/typeorm/entities/Size";

interface ISizeRepository {
    create(data: ICreateSizeDTO): Promise<Size>;
    find(where: object | object[], relations?: string[]): Promise<Size | undefined>;
    list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Size[], number]>;
    update(size: Size, data: IUpdateSizeDTO): Promise<Size>;
    delete(id: number): Promise<boolean>;
}

export default ISizeRepository;
