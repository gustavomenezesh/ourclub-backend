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
import ColumnNumericTransformer from '@modules/product/utils/ClassNumericTransformer';
import User from '@modules/user/infra/typeorm/entities/User';
import Adress from '@modules/adress/infra/typeorm/entities/Adress';

@Entity('venda')
class Sale {
    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id!: number;

    @Column({ type: 'smallint', name: 'usuarioId' })
    userId!: number;

    @Column({ type: 'smallint', name: 'enderecoId' })
    adressId!: number;

    @Column({ type: 'varchar', name: 'descricao', length: 1024 })
    description!: string;

    @Column({ type: 'varchar', name: 'codigo', length: 64 })
    code!: string;

    @Column({
      type: 'numeric', precision: 6, scale: 2, transformer: new ColumnNumericTransformer(), name: 'total',
    })
    total!: number;

    @Column({ type: 'varchar', name: 'formaPagamento', length: 32 })
    paymentType!: string;

    @Column({ type: 'boolean', name: 'pagamentoConfirmado', default: false })
    confirmed!: boolean;

    @Exclude()
    @Column({ type: 'boolean', name: 'ativo', default: true })
    enabled!: boolean;

    @Exclude()
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.sales)
    @JoinColumn([{ name: 'usuarioId', referencedColumnName: 'id' }])
    user?: User;

    @ManyToOne(() => Adress, (adress) => adress.sales)
    @JoinColumn([{ name: 'enderecoId', referencedColumnName: 'id' }])
    adress?: Adress;
}

export default Sale;
