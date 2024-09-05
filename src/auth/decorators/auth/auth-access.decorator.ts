import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PoliciesGuard } from '../../guards/policies.guard';

import { CheckPolicies } from '../check-policies/check-policies.decorator';

import { AuthStrategy, PolicyHandler } from '../../../constants/auth.constant';

export function AuthAccess(...handlers: PolicyHandler[]) {
  return applyDecorators(
    CheckPolicies(...handlers),
    UseGuards(AuthGuard(AuthStrategy.JWT_ACCESS), PoliciesGuard),
  );
}
