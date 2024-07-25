import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from 'src/infrastructure/repositories/auth.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: "IAuthRepository",
      useClass: AuthRepository,
    },
    {
      provide: "IUserRepository",
      useClass: UserRepository,
    }
  ],
})
export class AuthModule { }
