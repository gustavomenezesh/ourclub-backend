import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import SubCategory from '@modules/subcategory/infra/typeorm/entities/SubCategory';

@Entity('categoria')
class Category {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
  id!: number;

  @Column({ type: 'varchar', name: 'descricao', length: 64 })
  description!: string;

  @Exclude()
  @Column({ type: 'boolean', name: 'ativo', default: true })
  enabled!: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => SubCategory, (Subcategory) => Subcategory.category)
  subcategories?: SubCategory[];
}

export default Category;
