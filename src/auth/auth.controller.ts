import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { Routes, Services } from '../utils/constants';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    this.authService.register(registerDto);
  }

  @Post('login')
  login() {}

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}
