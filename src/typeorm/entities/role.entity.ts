import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Permission } from './permission.entity';

import { RoleName } from '../../constants';

@Entity({
  name: 'role',
})
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RoleName,
    unique: true,
  })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
