import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';

import { AuthService } from './auth.service';
import { EnvConfigService } from '../env-config/env-config.service';

import { AuthController } from './auth.controller';

import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

import { Service } from '../constants';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: (envConfigService: EnvConfigService) => ({
        secret: envConfigService.jwtSecret,
      }),
      inject: [EnvConfigService],
    }),
    UserModule,
    SessionModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: Service.AUTH,
      useClass: AuthService,
    },
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  exports: [PassportModule, JwtModule, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
