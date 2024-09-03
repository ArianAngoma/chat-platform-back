import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Session } from './session.entity';

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

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
