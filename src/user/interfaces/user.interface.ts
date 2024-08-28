import { CreateUserDto } from '../dtos/create-user.dto';

export interface IUsersService {
  create(createUserDto: CreateUserDto): void;
}
