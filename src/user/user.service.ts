import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dtos/create-user.dto';

import { IUsersService } from './interfaces/user.interface';

import { User } from '../typeorm/entities';

@Injectable()
export class UserService implements IUsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findOneById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmailToValidate(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  async findAllPermissionsById(userId: string) {
    const user = await this.getUserWithPermissions(userId);
    if (!user) throw new BadRequestException('User not found');

    return this.flattenPermissions(user);
  }

  private async getUserWithPermissions(userId: string) {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: {
        roles: {
          permissions: {
            subject: true,
          },
        },
      },
    });
  }

  private flattenPermissions(user: User) {
    return user.roles.flatMap((role) => role.permissions);
  }

  private handleDBError(error: any): never {
    if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
      throw new ConflictException('User with this email already exists');
    }

    console.log(error);

    throw new BadRequestException('Something went wrong');
  }
}
