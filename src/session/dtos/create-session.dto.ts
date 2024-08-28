import { IsIP, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { User } from '../../utils/typeorm';

export class CreateSessionDto {
  @Type(() => User)
  @IsNotEmpty()
  user: User;

  @IsString()
  @IsNotEmpty()
  device: string;

  @IsIP()
  @IsNotEmpty()
  ipAddress: string;
}
