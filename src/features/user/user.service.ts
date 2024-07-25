import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from 'src/infrastructure/interfaces/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) { }

  async findAllUser() {
    return await this.userRepository.findAllUser();
  }

  async findOne(email: string) {
    return await this.userRepository.findOneUser(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.removeUser(id);
  }
}

