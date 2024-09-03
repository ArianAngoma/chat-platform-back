import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';

import { User } from '../typeorm/entities';

import { Service } from '../constants';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: Service.USER,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: Service.USER,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
