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
import User from '@entities/User';
import Sale from '@modules/sale/infra/typeorm/entities/Sale';

@Entity('endereco')
class Adress {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
  id!: number;

  @Column({ type: 'smallint', name: 'usuarioId' })
  userId!: number;

  @Column({ type: 'varchar', name: 'estado', length: 20 })
  state!: string;

  @Column({ type: 'varchar', name: 'cep', length: 8 })
  cep!: string;

  @Column({ type: 'varchar', name: 'cidade', length: 64 })
  city!: string;

  @Column({ type: 'varchar', name: 'logradouro', length: 128 })
  street!: string;

  @Column({ type: 'varchar', name: 'bairro', length: 64 })
  district!: string;

  @Column({ type: 'varchar', name: 'numero', length: 5 })
  number!: string;

  @Column({
    type: 'varchar', name: 'complemento', length: 64, nullable: true,
  })
  complement!: string;

  @Column({ type: 'boolean', name: 'principal', default: false })
  main!: boolean;

  @Exclude()
  @Column({ type: 'boolean', name: 'ativo', default: true })
  enabled!: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.adresses)
  @JoinColumn([{ name: 'usuarioId', referencedColumnName: 'id' }])
  user!: User;

  @OneToMany(() => Sale, (sale) => sale.user)
  sales?: Sale[];
}

export default Adress;
