import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 320,
    unique: true,
    name: 'email',
  })
  email: string;

  @Column({
    type: 'text',
    select: false,
    name: 'password',
  })
  @Exclude()
  password: string;

  @Column({
    type: 'text',
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'text',
    name: 'last_name',
  })
  lastName: string;
}
