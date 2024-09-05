import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppAbility } from '../../../constants';

export const GetAbility = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const ability = request.ability as AppAbility;

    if (!ability)
      throw new InternalServerErrorException('Ability not found in request');

    return ability;
  },
);
