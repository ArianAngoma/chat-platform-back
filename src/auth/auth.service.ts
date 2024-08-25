import { Inject, Injectable } from '@nestjs/common';

import { IAuthService } from './interfaces/auth.interface';
import { Services } from '../utils/constants';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly usersService: UsersService,
  ) {}

  register(registerDto: RegisterDto) {
    this.usersService.create(registerDto);
  }
}
