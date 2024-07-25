import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from 'src/infrastructure/interfaces/auth-repository.interface';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('IAuthRepository') private readonly authRepository: IAuthRepository) { }
  async login(userCredential: CreateAuthDto) {
    return await this.authRepository.login(userCredential);
  }
  async registerUser(createUserDto: CreateUserDto) {
    return await this.authRepository.registerUser(createUserDto);
  }
}
