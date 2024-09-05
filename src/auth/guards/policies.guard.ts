import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Session } from '../../typeorm/entities';

import { CaslAbilityFactory } from '../../casl/casl-ability.factory/casl-ability.factory';

import {
  AppAbility,
  Policy,
  PolicyHandler,
} from '../../constants/auth.constant';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        Policy.CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    console.log({ policyHandlers });

    const session = this.getSessionFromContext(context);

    if (!session)
      throw new InternalServerErrorException('User not found in request');

    const ability = await this.caslAbilityFactory.createForUser(session.user);

    const request = context.switchToHttp().getRequest();
    request.ability = ability;

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }

  private getSessionFromContext(context: ExecutionContext): Session {
    return context.switchToHttp().getRequest().user as Session;
  }
}
