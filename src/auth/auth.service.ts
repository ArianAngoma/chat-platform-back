import { Inject, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

import { RegisterDto } from './dtos/register.dto';

import { hashPassword } from '../utils/helpers';

import { IAuthService } from './interfaces/auth.interface';

import { Services } from '../utils/constants';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = hashPassword(registerDto.password);
    return this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
  }
}
