import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthStrategies } from '../../../utils/constants';

export function AuthAccess() {
  return applyDecorators(UseGuards(AuthGuard(AuthStrategies.JWT_ACCESS)));
}
