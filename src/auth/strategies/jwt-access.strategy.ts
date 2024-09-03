import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvConfigService } from '../../env-config/env-config.service';
import { SessionService } from '../../session/session.service';

import { JwtPayload, TokenType } from '../interfaces/jwt-payload.interface';

import { AuthStrategy, Service } from '../../constants';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.JWT_ACCESS,
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
    if (type !== TokenType.ACCESS)
      throw new UnauthorizedException('Invalid token type');

    const session = await this.sessionService.findById(sessionId);

    if (!session) throw new UnauthorizedException('Session not found');

    if (session.revokedAt) throw new UnauthorizedException('Session revoked');

    return session;
  }
}
