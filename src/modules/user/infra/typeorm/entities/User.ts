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
import Profile from './Profile';

@Entity('usuario')
class User {
  @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
  id!: number;

  @Column({ type: 'smallint', name: 'perfilId' })
  profileId!: number;

  @Column({ type: 'varchar', name: 'nome', length: 64 })
  name!: string;

  @Column({ type: 'varchar', name: 'sobrenome', length: 64 })
  lastName!: string;

  @Column({
    type: 'varchar', name: 'email', length: 256, unique: true,
  })
  email!: string;

  @Column({ type: 'varchar', name: 'telefone', length: 16 })
  phone!: string;

  @Column({ type: 'varchar', name: 'sexo', length: 9 })
  gender!: string;

  @Exclude()
  @Column({ type: 'varchar', name: 'senha', length: 1024 })
  password!: string;

  @Column({ type: 'boolean', name: 'validado', default: false })
  validated!: boolean;

  @Exclude()
  @Column({ type: 'boolean', name: 'ativo', default: true })
  enabled!: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @ManyToOne(() => Profile, (profile) => profile.users)
  @JoinColumn([{ name: 'perfilId', referencedColumnName: 'id' }])
  profile!: Profile;
}

export default User;
