import Sale from '@modules/sale/infra/typeorm/entities/Sale';
import { Exclude } from 'class-transformer';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('entrega')
class Delivery {
    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id!: number;

    @Column({ type: 'smallint', name: 'vendaId' })
    saleId!: number;

    @Column({ type: 'float', name: 'valor' })
    value!: string;

    @Column({ type: 'varchar', name: 'prazo', length: 10 })
    deadline!: string;

    @Column({ type: 'varchar', name: 'rastreio', length: 40 })
    tracking!: string;

    @Exclude()
    @Column({ type: 'boolean', name: 'ativo', default: true })
    enabled!: boolean;

    @Exclude()
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @ManyToOne(() => Sale, (sale) => sale.deliveries)
    @JoinColumn([{ name: 'vendaId', referencedColumnName: 'id' }])
    sale?: Sale;
}

export default Delivery;
