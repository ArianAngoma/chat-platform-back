import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env-config.schema';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService<Env, true>) {}

  get port(): number {
    return this.configService.get<number>('PORT');
  }
}
