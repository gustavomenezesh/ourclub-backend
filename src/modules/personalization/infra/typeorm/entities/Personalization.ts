import SaleProduct from '@modules/sale/infra/typeorm/entities/SaleProducts';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('personalizacao')
class Personalization {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
  id!: number;

    @Column({
      type: 'varchar', name: 'nome', length: 64, nullable: true,
    })
    name!: string;

    @Column({
      type: 'varchar', name: 'numero', length: 6, nullable: true,
    })
    number!: string;

  @Column({
    type: 'varchar', name: 'cor', length: 14, nullable: true,
  })
  color!: string | null;

  @Column({ type: 'float', name: 'valor' })
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

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.personalization)
  saleProducts?: SaleProduct[];
}

export default Personalization;
