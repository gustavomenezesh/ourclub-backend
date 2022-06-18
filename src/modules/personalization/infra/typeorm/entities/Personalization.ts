import Product from '@modules/product/infra/typeorm/entities/Product';
import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('personalizacao')
class Personalization {
    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', name: 'nome', length: 64 })
    name!: string;

    @Column({ type: 'varchar', name: 'numero', length: 6 })
    number!: string;

    @Column({ type: 'varchar', name: 'cor', length: 14 })
    color!: string;

    @Column({ type: 'float', name: 'valor' })
    value!: string;

    @Column({ type: 'smallint', name: 'produtoId' })
    productId!: number;

    @Exclude()
    @Column({ type: 'boolean', name: 'ativo', default: true })
    enabled!: boolean;

    @Exclude()
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @ManyToOne(() => Product, (product) => product.personalizations)
    @JoinColumn([{ name: 'produtoId', referencedColumnName: 'id' }])
    product?: Product;
}

export default Personalization;
