import { User } from "src/domain/user/user.entity";
import { CreateUserDto } from "src/features/user/dto/create-user.dto";
import { UpdateUserDto } from "src/features/user/dto/update-user.dto";
export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  findAllUser(): Promise<User[]>;
  findOneUser(email: string): Promise<User>;
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  removeUser(id: number): Promise<void>;
}
