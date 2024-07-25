import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CreateUserDto } from 'src/features/user/dto/create-user.dto';
import { SALT_ROUNDS } from 'src/infrastructure/common/constant';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ParseUserPipe implements PipeTransform {
    async transform(value: CreateUserDto, metadata: ArgumentMetadata) {
        return this.parseUserData(value);
    }
    private async parseUserData(value: CreateUserDto) {
        const { password, ...rest } = value;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return {
            ...rest,
            password: hashedPassword
        };
    }
}
