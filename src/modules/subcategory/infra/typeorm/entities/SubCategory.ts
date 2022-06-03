import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Category from '@modules/category/infra/typeorm/entities/Category';

@Entity('subcategoria')
class SubCategory {
    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', name: 'descricao', length: 64 })
    description!: string;

    @Column({ type: 'int', name: 'categoriaId', primary: true })
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
}

export default SubCategory;
