import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthStrategy } from '../../../constants';

export function AuthAccess() {
  return applyDecorators(UseGuards(AuthGuard(AuthStrategy.JWT_ACCESS)));
}
