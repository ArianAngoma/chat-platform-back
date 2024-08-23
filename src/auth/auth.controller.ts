import { Controller, Inject } from '@nestjs/common';

import { Routes, Services } from '../utils/types';
import { AuthService } from './auth.service';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: AuthService,
  ) {}
}
