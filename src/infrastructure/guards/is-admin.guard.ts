import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Role } from 'src/domain/user/enums/role';

@Injectable()
export class isAdminGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<any>();
        try {
            if (request.user.role !== Role.ADMIN) {
                throw new UnauthorizedException('Admin access only!');
            }
            return true
        } catch (err) {
            throw new UnauthorizedException('Admin access only!');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (!authHeader) return undefined;

        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}
