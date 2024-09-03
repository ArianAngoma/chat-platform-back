import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvConfigService } from '../../env-config/env-config.service';
import { SessionService } from '../../session/session.service';

import { JwtPayload, TokenType } from '../interfaces/jwt-payload.interface';

import { AuthStrategy, Service } from '../../constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.JWT_REFRESH,
) {
  constructor(
    private readonly envConfigService: EnvConfigService,
    @Inject(Service.SESSION) private readonly sessionService: SessionService,
  ) {
    super({
      secretOrKey: envConfigService.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate({ sessionId, type }: JwtPayload) {
    if (type !== TokenType.REFRESH) {
      throw new UnauthorizedException('Invalid token type');
    }

    const session = await this.sessionService.findById(sessionId);
    if (!session || session.revokedAt) {
      throw new UnauthorizedException(
        session ? 'Session revoked' : 'Session not found',
      );
    }

    const daysDifference = this.calculateDaysDifference(
      session.lastActivityAt,
      new Date(),
    );
    if (daysDifference > this.envConfigService.maxUserActivityDays) {
      await this.sessionService.revoke(session.id);
      throw new UnauthorizedException('Session expired');
    }

    return session;
  }

  private calculateDaysDifference(date1: Date, date2: Date): number {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return (date2.getTime() - date1.getTime()) / millisecondsPerDay;
  }
}
