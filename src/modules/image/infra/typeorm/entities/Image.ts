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
import Product from '@modules/product/infra/typeorm/entities/Product';

@Entity('imagem')
class Image {
    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id!: number;

    @Column({ type: 'smallint', name: 'produtoId' })
    productId!: number;

    @Column({ type: 'varchar', name: 'url', length: 140 })
    url!: string;

    @Column({ type: 'text', name: 'token' })
    token!: string;

    @Column({ type: 'varchar', name: 'tamanho', length: 32 })
    size!: string;

    @Exclude()
    @Column({ type: 'boolean', name: 'ativo', default: true })
    enabled!: boolean;

    @Exclude()
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @ManyToOne(() => Product, (product) => product.images)
    @JoinColumn([{ name: 'produtoId', referencedColumnName: 'id' }])
    product?: Product;
}

export default Image;
