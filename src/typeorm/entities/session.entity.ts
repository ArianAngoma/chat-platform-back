import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity({
  name: 'session',
})
export class Session {
  @PrimaryGeneratedColumn('uuid')
  @Index('idx_session_id')
  id: string;

  @Column({
    type: 'varchar',
    name: 'device',
  })
  device: string;

  @Column({
    type: 'varchar',
    name: 'ip_address',
  })
  ipAddress: string;

  @Index('idx_user_sessions')
  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'last_activity_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastActivityAt: Date;

  @Column({
    type: 'timestamp',
    name: 'revoked_at',
    nullable: true,
  })
  @Index('idx_session_revoked_at')
  revokedAt?: Date;
}
