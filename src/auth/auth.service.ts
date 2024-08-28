import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { EnvConfigService } from '../env-config/env-config.service';

import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

import { comparePasswords, hashPassword } from '../utils/helpers';

import { IAuthService } from './interfaces/auth.interface';
import { JwtPayload, TokenType } from './interfaces/jwt-payload.interface';

import { Session, User } from '../utils/typeorm';

import { Services } from '../utils/constants';

@Injectable()
export class AuthService implements IAuthService {
  private readonly DEVICE_TYPE = 'web';
  private readonly IP_ADDRESS = '192.168.1.1';

  constructor(
    @Inject(Services.USER) private readonly userService: UserService,
    @Inject(Services.SESSION) private readonly sessionService: SessionService,
    private readonly envConfigService: EnvConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = hashPassword(registerDto.password);
    const createdUser = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });
    return this.getTokensAndSession(createdUser);
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findByEmailToValidate(email);
    if (!user || !comparePasswords(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.getTokensAndSession(user);
  }

  async refreshToken(session: Session) {
    await this.updateSessionLastActivity(session.id);
    return this.createTokens(session.id);
  }

  private async getTokensAndSession(user: User) {
    const session = await this.sessionService.create({
      user,
      device: this.DEVICE_TYPE,
      ipAddress: this.IP_ADDRESS,
    });
    const { accessToken, refreshToken } = this.createTokens(session.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return {
      ...result,
      tokens: { accessToken, refreshToken },
    };
  }

  private createTokens(sessionId: string) {
    const accessToken = this.createToken({ sessionId, type: TokenType.ACCESS });
    const refreshToken = this.createToken({
      sessionId,
      type: TokenType.REFRESH,
    });
    return { accessToken, refreshToken };
  }

  private createToken({ sessionId, type }: JwtPayload) {
    return this.jwtService.sign(
      { sessionId, type },
      {
        expiresIn:
          type === TokenType.ACCESS
            ? this.envConfigService.jwtAccessExpirationIn
            : this.envConfigService.jwtRefreshExpirationIn,
      },
    );
  }

  private async updateSessionLastActivity(sessionId: string) {
    const newLastActivity = new Date();
    await this.sessionService.updateLastActivity(sessionId, {
      lastActivityAt: newLastActivity,
    });
  }
}
