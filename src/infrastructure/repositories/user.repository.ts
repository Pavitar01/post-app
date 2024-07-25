import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';
import { CreateUserDto } from 'src/features/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/features/user/dto/update-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
    async findByEmail(email: string): Promise<User> {
        return await this.findOneBy({ email });
    }
    async findAllUser(): Promise<User[]> {
        return await this.find();
    }

    async findOneUser(email: string): Promise<User> {
        return await this.findOneBy({ email });
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        await this.update(id, updateUserDto);
        return await this.findOneBy({ id: Number(id) });
    }

    async removeUser(id: number): Promise<void> {
        await this.delete(id);
    }
}
