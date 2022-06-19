import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import ColumnNumericTransformer from '@modules/product/utils/ClassNumericTransformer';
import Image from '@modules/image/infra/typeorm/entities/Image';
import SubCategory from '@modules/subcategory/infra/typeorm/entities/SubCategory';
import SaleProduct from '@modules/sale/infra/typeorm/entities/SaleProducts';

@Entity('produto')
class Product {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
  id!: number;

  @Column({ type: 'smallint', name: 'subcategoriaId' })
  subCategoryId!: number;

  @Column({ type: 'varchar', name: 'titulo', length: 64 })
  title!: string;

  @Column({
    type: 'numeric', precision: 6, scale: 2, transformer: new ColumnNumericTransformer(), name: 'valor',
  })
  value!: number | null;

  @Column({ type: 'varchar', name: 'descricao', length: 1024 })
  description!: string;

  @Column({ type: 'varchar', name: 'genero', length: 9 })
  gender!: string;

  @Exclude()
  @Column({ type: 'boolean', name: 'ativo', default: true })
  enabled!: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
  @JoinColumn([{ name: 'subcategoriaId', referencedColumnName: 'id' }])
  subCategory?: SubCategory;

  @OneToMany(() => Image, (image) => image.product)
  images?: Image[];

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.product)
  saleProducts?: SaleProduct[];
}

export default Product;
