import ColumnNumericTransformer from '@modules/product/utils/ClassNumericTransformer';
import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn, Entity,
    PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity('promocao')
class Promotion {
    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', name: 'titulo', length: 64 })
    title!: string;

    @Column({ type: 'varchar', name: 'descricao', length: 1024 })
    description!: string;

    @Column({ type: 'varchar', name: 'codigo', length: 64 })
    code!: string;

    @Column({
        type: 'numeric', precision: 6, scale: 2, transformer: new ColumnNumericTransformer(), name: 'valor',
    })
    value!: number;

    @Exclude()
    @Column({ type: 'boolean', name: 'ativo', default: true })
    enabled!: boolean;

    @Exclude()
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;
}

export default Promotion;
