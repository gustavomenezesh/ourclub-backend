import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Size from '@modules/size/infra/typeorm/entities/Size';
import Product from '@modules/product/infra/typeorm/entities/Product';
import Sale from '@modules/sale/infra/typeorm/entities/Sale';
import Personalization from '@modules/personalization/infra/typeorm/entities/Personalization';

@Entity('vendaProduto')
class SaleProduct {
    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id!: number;

    @Column({ type: 'smallint', name: 'vendaId' })
    saleId!: number;

    @Column({ type: 'smallint', name: 'produtoId' })
    productId!: number;

    @Column({ type: 'smallint', name: 'tamanhoId' })
    sizeId!: number;

    @Column({ type: 'smallint', name: 'personalizacaoId', nullable: true })
    personalizationId!: number | null;

    @Exclude()
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @ManyToOne(() => Sale, (sale) => sale.saleProducts)
    @JoinColumn([{ name: 'vendaId', referencedColumnName: 'id' }])
    sale?: Sale;

    @ManyToOne(() => Product, (product) => product.saleProducts)
    @JoinColumn([{ name: 'produtoId', referencedColumnName: 'id' }])
    product?: Product;

    @ManyToOne(() => Size, (size) => size.saleProducts)
    @JoinColumn([{ name: 'tamanhoId', referencedColumnName: 'id' }])
    size?: Size;

    @ManyToOne(() => Personalization, (personalization) => personalization.saleProducts)
    @JoinColumn([{ name: 'personalizacaoId', referencedColumnName: 'id' }])
    personalization?: Personalization;
}

export default SaleProduct;
