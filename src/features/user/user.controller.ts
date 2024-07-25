import { Controller, Get, Post, Body, HttpCode, HttpStatus, UsePipes, InternalServerErrorException, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ParseUserPipe } from 'src/infrastructure/pipes/parse-user';
import { AuthGuard } from 'src/infrastructure/guards/auth.guard';
import { isAdminGuard } from 'src/infrastructure/guards/is-admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get("profile")
  @UseGuards(AuthGuard)
  findOne(@Request() req: any) {
    return this.userService.findOne(req?.user?.email);
  }
  @Get("all-user")
  @UseGuards(AuthGuard, isAdminGuard)
  findAll() {
    return this.userService.findAllUser();
  }
}
