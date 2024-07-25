import { User } from "src/domain/user/user.entity";
import { CreateAuthDto } from "src/features/auth/dto/create-auth.dto";
import { CreateUserDto } from "src/features/user/dto/create-user.dto";

export interface IAuthRepository {
    login(userCredential: CreateAuthDto): Promise<string>;
    registerUser(createUserDto: CreateUserDto): Promise<User>;
}
