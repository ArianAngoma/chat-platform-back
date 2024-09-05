import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Permission } from './permission.entity';

enum SubjectEnum {
  USER = 'User',
  SESSION = 'Session',
  ROLE = 'Role',
  PERMISSION = 'Permission',
  SUBJECT = 'Subject',
}

@Entity({
  name: 'subject',
})
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: SubjectEnum,
    unique: true,
  })
  name: SubjectEnum;

  @OneToMany(() => Permission, (permission) => permission.subject)
  permissions: Permission[];
}
