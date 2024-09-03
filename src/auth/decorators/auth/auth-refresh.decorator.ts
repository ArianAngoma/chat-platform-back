import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthStrategy } from '../../../constants';

export function AuthRefresh() {
  return applyDecorators(UseGuards(AuthGuard(AuthStrategy.JWT_REFRESH)));
}
