import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { prismaservice } from "src/prisma/prisma.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly prismaService: prismaservice
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: {
                Enrollment: +username
            }
        })

        if (!user) throw new NotFoundException();

        if (user.password === password) {
            const { password, ...result } = user;
            return result;
        } else {
            throw new NotFoundException()
        }
    }
}