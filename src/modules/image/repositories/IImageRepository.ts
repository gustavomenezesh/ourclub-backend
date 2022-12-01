import ICreateImageDTO from '../dtos/ICreateImageDTO';
import IUpdateImageDTO from '../dtos/IUpdateImageDTO';
import Image from '../infra/typeorm/entities/Image';

interface IImageRepository {
    create(data: ICreateImageDTO): Promise<Image>;
    find(where: object | object[], relations?: string[]): Promise<Image | undefined>;
    list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Image[], number]>;
    listProductsByTitle(title: string): Promise<Image[]>;
    update(image: Image, data: IUpdateImageDTO): Promise<Image>;
    delete(id: number): Promise<boolean>;
}

export default IImageRepository;
