import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from './env-config.schema';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService<Env, true>) {}

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get mysqlHost(): string {
    return this.configService.get<string>('MYSQL_DB_HOST');
  }

  get mysqlUsername(): string {
    return this.configService.get<string>('MYSQL_DB_USERNAME');
  }

  get mysqlPassword(): string {
    return this.configService.get<string>('MYSQL_DB_PASSWORD');
  }

  get mysqlPort(): number {
    return this.configService.get<number>('MYSQL_DB_PORT');
  }

  get mysqlDatabase(): string {
    return this.configService.get<string>('MYSQL_DB_NAME');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get jwtAccessExpirationIn(): string {
    return this.configService.get<string>('JWT_ACCESS_EXPIRES_IN');
  }

  get jwtRefreshExpirationIn(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRES_IN');
  }

  get maxUserActivityDays(): number {
    return this.configService.get<number>('MAX_USER_ACTIVITY_DAYS');
  }
}
