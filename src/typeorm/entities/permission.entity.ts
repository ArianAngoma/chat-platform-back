import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { MongoQuery } from '@casl/ability';

import { Role } from './role.entity';
import { Subject } from './subject.entity';

import { PermissionAction } from '../../constants';

@Entity({
  name: 'permission',
})
@Unique(['action', 'subject'])
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: PermissionAction,
  })
  action: PermissionAction;

  @Column({
    type: 'json',
    nullable: true,
  })
  condition?: MongoQuery;

  @ManyToOne(() => Subject, (subject) => subject.permissions, {
    nullable: false,
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
