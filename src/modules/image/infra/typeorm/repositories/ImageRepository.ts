import ICreateImageDTO from '@modules/image/dtos/ICreateImageDTO';
import IUpdateImageDTO from '@modules/image/dtos/IUpdateImageDTO';
import IImageRepository from '@modules/image/repositories/IImageRepository';
import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import Image from '../entities/Image';

@injectable()
class ImageRepository implements IImageRepository {
    private ormRepository = getConnection().getRepository(Image);

    public async create(data: ICreateImageDTO): Promise<Image> {
      const image = this.ormRepository.create(data);
      return this.ormRepository.save(image);
    }

    public async find(where: object | object[], relations?: string[]): Promise<Image | undefined> {
      return this.ormRepository.findOne({ where, relations });
    }

    public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Image[], number]> {
      return this.ormRepository.findAndCount({
        where, relations, take, skip,
      });
    }

    public async listProductsByTitle(title: string): Promise<Image[]> {
      return this.ormRepository.createQueryBuilder('imagem')
        .innerJoinAndSelect('imagem.produto', 'product', 'product.titulo ILIKE :title', { title })
        .where('product.ativo = true')
        .getMany();
    }

    public async update(image: Image, data: IUpdateImageDTO): Promise<Image> {
      this.ormRepository.merge(image, data);
      return this.ormRepository.save(image);
    }

    public async delete(id: number): Promise<boolean> {
      return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
    }
}

export default ImageRepository;
