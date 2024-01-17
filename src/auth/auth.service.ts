import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthDto } from "./authdto/auth.dto";
import { prismaservice } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class authservice {
    constructor(private jwt: JwtService, private Prisma: prismaservice, private config: ConfigService) { }

    async signin(dto: AuthDto) {
        try {
            const user = this.Prisma.user.findUnique({
                where: {
                    Enrollment: dto.Enrollment
                }
            })

            if (!user) {
                throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
            }

            const payload = {
                Enrollment: dto.Enrollment,
                Password: dto.Password
            }

            const token = await this.jwt.signAsync(payload, {
                secret: this.config.get("JWT_SECRET")
            })

            return {
                access_token: token
            }

        } catch (error) {
            throw new HttpException("somthing went wrong!", HttpStatus.BAD_REQUEST);
        }
    }
}