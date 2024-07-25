import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, InternalServerErrorException, BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ParseUserPipe } from 'src/infrastructure/pipes/parse-user';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('/login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ParseUserPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const alreadyExists = await this.userService.findOne(createUserDto.email);
      if (alreadyExists) throw new ConflictException('User already exists');
      const user = await this.authService.registerUser(createUserDto);
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Could not create user');
    }
  }
}
