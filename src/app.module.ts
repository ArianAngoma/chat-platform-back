import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from './env-config/env-config.schema';
import { EnvConfigModule } from './env-config/env-config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    EnvConfigModule,
    ConfigModule.forRoot({
      validate: (config) => envSchema.parse(config),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
