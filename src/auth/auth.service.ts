import { HttpException, HttpStatus, Injectable, Request } from "@nestjs/common";
import { AuthDto } from "./authdto/auth.dto";
import { prismaservice } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class authservice {
    constructor(private jwt: JwtService, private Prisma: prismaservice, private config: ConfigService) { }

    async loginUser(user: any): Promise<any> {
        return {
            token: this.jwt.sign({
                enrollment_no: user.Enrollment,
                sub: user.id
            })
        }
    }
}