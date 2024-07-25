import { ForbiddenException, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { JWT_CONSTANTS } from "../common/constant";

export class ValidUserMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const Authorization = req.headers["authorization"];
        if (!Authorization) {
            throw new UnauthorizedException();
        }
        else {
            try {
                const payload = await this.jwtService.verifyAsync(
                    Authorization,
                    {
                        secret: JWT_CONSTANTS.secret
                    }
                );
                req["user"] = payload
                return payload
            } catch {
                throw new UnauthorizedException();
            }
        }
    }
    private async isValidUser(token: string) {
        if (!token) {
            return false
        } else {


        }
    }
}