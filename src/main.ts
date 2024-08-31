import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { EnvConfigService } from './env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiEnvConfigService = app.get(EnvConfigService);
  const port = apiEnvConfigService.port;
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: apiEnvConfigService.corsOrigin,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  logger.log(`Application is running on: ${port}`);
}

void bootstrap();
