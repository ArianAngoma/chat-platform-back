import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Session } from './session.entity';
import { Role } from './role.entity';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'email',
  })
  @Index({ unique: true })
  email: string;

  @Column({
    type: 'varchar',
    name: 'password',
    select: false,
  })
  @Exclude()
  password: string;

  @Column({
    type: 'varchar',
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
  })
  lastName: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
