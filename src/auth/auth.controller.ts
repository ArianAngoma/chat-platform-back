import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

import { GetSession } from './decorators/get-session/get-session.decorator';
import { AuthRefresh } from './decorators/auth/auth-refresh.decorator';

import { Session } from '../utils/typeorm';

import { Routes, Services } from '../utils/constants';

@Controller(Routes.AUTH)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @AuthRefresh()
  refreshToken(@GetSession() session: Session) {
    return this.authService.refreshToken(session);
  }

  @Post('logout')
  logout() {}
}
