import { Policy, PolicyHandler } from '../../../constants/auth.constant';

import { SetMetadata } from '@nestjs/common';

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(Policy.CHECK_POLICIES_KEY, handlers);
