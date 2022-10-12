import {
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('tag')
class Tag {
    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id!: number;

    @Column({ type: 'varchar', name: 'descricao', length: 20 })
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
}

export default Tag;
