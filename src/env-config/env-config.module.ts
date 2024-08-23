import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

import { EnvConfigService } from './env-config.service';

@Global()
@Module({
  providers: [EnvConfigService],
  exports: [EnvConfigService],
  imports: [ConfigModule],
})
export class EnvConfigModule {}
