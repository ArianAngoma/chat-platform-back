import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSessionDto } from './dtos/create-session.dto';
import { UpdateLastActivityDto } from './dtos/update-last-activity.dto';

import { Session, User } from '../typeorm/entities';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const session = this.sessionsRepository.create(createSessionDto);
    return this.sessionsRepository.save(session);
  }

  async revoke(sessionId: string) {
    const session = await this.findById(sessionId);

    if (!session) throw new NotFoundException('Session not found');

    session.revokedAt = new Date();
    await this.sessionsRepository.save(session);
  }

  async updateLastActivity(
    sessionId: string,
    updateLastActivityDto: UpdateLastActivityDto,
  ) {
    const session = await this.sessionsRepository.preload({
      id: sessionId,
      ...updateLastActivityDto,
    });

    if (!session) throw new NotFoundException('Session not found');

    return this.sessionsRepository.save(session);
  }

  async revokeAllSessions(user: User) {
    const sessions = await this.sessionsRepository.find({
      where: { user, revokedAt: undefined },
    });
    await Promise.all(
      sessions.map((session) => {
        session.revokedAt = new Date();
        return this.sessionsRepository.save(session);
      }),
    );
  }

  async findById(sessionId: string) {
    return this.sessionsRepository.findOneBy({ id: sessionId });
  }
}
