import { Injectable } from '@nestjs/common';
import { IUsersService } from './interfaces/users.interface';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService implements IUsersService {
  create(createUserDto: CreateUserDto) {
    console.log('Creating a user...');
    console.log(createUserDto);
  }
}
