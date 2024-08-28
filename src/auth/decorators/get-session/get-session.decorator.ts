import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

import { Session } from '../../../utils/typeorm';

export const GetSession = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const session = request.user as Session;

    if (!session)
      throw new InternalServerErrorException('Session not found in request');

    return session;
  },
);
