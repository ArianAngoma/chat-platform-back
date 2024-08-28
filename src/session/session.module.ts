import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionService } from './session.service';

import { Session } from '../utils/typeorm';

import { Services } from '../utils/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [
    {
      provide: Services.SESSION,
      useClass: SessionService,
    },
  ],
  exports: [
    {
      provide: Services.SESSION,
      useClass: SessionService,
    },
  ],
})
export class SessionModule {}
