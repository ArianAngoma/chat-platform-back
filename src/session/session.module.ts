import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionService } from './session.service';

import { Session } from '../typeorm/entities';

import { Service } from '../constants';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [
    {
      provide: Service.SESSION,
      useClass: SessionService,
    },
  ],
  exports: [
    {
      provide: Service.SESSION,
      useClass: SessionService,
    },
  ],
})
export class SessionModule {}
