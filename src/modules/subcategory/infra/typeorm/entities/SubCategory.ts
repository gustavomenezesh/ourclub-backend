import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Category from '@modules/category/infra/typeorm/entities/Category';
import Product from '@modules/product/infra/typeorm/entities/Product';

@Entity('subcategoria')
class SubCategory {
    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', name: 'descricao', length: 64 })
    description!: string;

    @Column({ type: 'smallint', name: 'categoriaId' })
    categoryId!: number;

    @Exclude()
    @Column({ type: 'boolean', name: 'ativo', default: true })
    enabled!: boolean;

    @Exclude()
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @ManyToOne(() => Category, (category) => category.subcategories)
    @JoinColumn([{ name: 'categoriaId', referencedColumnName: 'id' }])
    category?: Category;

    @OneToMany(() => Product, (product) => product.subCategory)
    products?: Product[];
}

export default SubCategory;
