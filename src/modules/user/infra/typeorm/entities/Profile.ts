import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import User from './User';

@Entity('perfil')
class Profile {
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

  @OneToMany(() => User, (user) => user.profile)
  users?: User[];
}

export default Profile;
