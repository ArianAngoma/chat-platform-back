import { Inject, Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import * as Mustache from 'mustache';

import { UserService } from '../../user/user.service';

import * as entities from '../../typeorm/entities';

import { AppAbility, PermissionSubject, Service } from '../../constants';

const subjectClassMap = Object.keys(entities).reduce((map, entityName) => {
  map[entityName] = entities[entityName];
  return map;
}, {});

@Injectable()
export class CaslAbilityFactory {
  constructor(
    @Inject(Service.USER) private readonly userService: UserService,
  ) {}

  async createForUser(user: entities.User) {
    const { can, build, rules } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    const userPermissions = await this.userService.findAllPermissionsById(
      user.id,
    );

    for (const permission of userPermissions) {
      const condition = this.renderCondition(
        JSON.stringify(permission.condition),
        user,
      );

      can(
        permission.action,
        subjectClassMap[permission.subject.name],
        JSON.parse(condition),
      );
    }

    console.log({ rules: JSON.stringify(rules) });

    return build({
      detectSubjectType: (item) => {
        return item.constructor as ExtractSubjectType<PermissionSubject>;
      },
    });
  }

  private renderCondition(conditionTemplate: string, user: entities.User) {
    return Mustache.render(conditionTemplate, user);
  }
}
