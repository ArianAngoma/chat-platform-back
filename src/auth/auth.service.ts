import { Injectable } from '@nestjs/common';
import { IAuthService } from './interfaces/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  validateUser() {
    console.log('Validating user...');
  }
}
