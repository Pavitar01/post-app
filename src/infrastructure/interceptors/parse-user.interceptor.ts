import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { SALT_ROUNDS } from 'src/infrastructure/common/constant';
import { map, Observable, tap } from 'rxjs';
import { UserService } from 'src/features/user/user.service';
import * as bcrypt from 'bcrypt';

export class ParseUserInterceptor implements NestInterceptor {
    constructor(private readonly userService: UserService) { }
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const { password, ...rest } = request.body;
        try {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            return next.handle().pipe(
                tap((data) => {
                    // this.userService.createUser({
                    //     ...rest,
                    //     password: hashedPassword
                    // })
                    // return {
                    //     ...rest
                    // }
                })
            );
        } catch (error) {
            console.error('Error hashing password:', error);
            throw new Error('Password hashing failed');
        }
    }
}
