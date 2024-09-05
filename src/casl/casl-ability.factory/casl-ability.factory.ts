import { Inject, Injectable } from '@nestjs/common';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import * as Mustache from 'mustache';

import { UserService } from '../../user/user.service';

import { User } from '../../typeorm/entities';

import { AppAbility, Service } from '../../constants';

@Injectable()
export class CaslAbilityFactory {
  constructor(
    @Inject(Service.USER) private readonly userService: UserService,
  ) {}

  async createForUser(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    const userPermissions = await this.userService.findAllPermissionsById(
      user.id,
    );

    for (const permission of userPermissions) {
      const condition = this.renderCondition(
        JSON.stringify(permission.condition),
        user,
      );

      can(permission.action, permission.subject.name, JSON.parse(condition));
    }

    return build();
  }

  private renderCondition(conditionTemplate: string, user: User) {
    return Mustache.render(conditionTemplate, user);
  }
}
