import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvConfigModule } from './env-config/env-config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { EnvConfigService } from './env-config/env-config.service';

import { envSchema } from './env-config/env-config.schema';
import { SessionModule } from './session/session.module';

import entities from './typeorm/entities';

@Module({
  imports: [
    EnvConfigModule,
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
    }),
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      useFactory: (envConfigService: EnvConfigService) => ({
        type: 'mysql',
        host: envConfigService.mysqlHost,
        port: envConfigService.mysqlPort,
        username: envConfigService.mysqlUsername,
        password: envConfigService.mysqlPassword,
        database: envConfigService.mysqlDatabase,
        synchronize: true,
        entities,
      }),
      inject: [EnvConfigService],
    }),
    AuthModule,
    UserModule,
    SessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
