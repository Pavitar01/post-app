import { DataSource, Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { CreateAuthDto } from 'src/features/auth/dto/create-auth.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/features/user/dto/create-user.dto';

@Injectable()
export class AuthRepository extends Repository<User> {
    constructor(private dataSource: DataSource,
        private readonly jwtService: JwtService
    ) {
        super(User, dataSource.createEntityManager());
    }
    async login(userCredential: CreateAuthDto) {
        const user = await this.findOneBy({ email: userCredential.email });
        if (!user) {
            throw new UnauthorizedException();
        } else {
            const isMatch = await bcrypt.compare(userCredential.password, user.password);
            if (!isMatch) {
                throw new UnauthorizedException("Pasword is incorrect");
            } else {
                const { password, ...rest } = user
                const token = await this.jwtService.signAsync({ ...rest })
                return token;
            }
        }
    }
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.save(createUserDto);
    }

}