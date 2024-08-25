import { RegisterDto } from '../dtos/register.dto';

export interface IAuthService {
  register(registerDto: RegisterDto): void;
}
