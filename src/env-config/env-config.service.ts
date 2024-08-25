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
}
