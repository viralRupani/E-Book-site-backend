import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { authservice } from "./auth.service";
import { JwtAuthGuard, LocalAuthGuard } from "./guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class authcontroller {
    constructor(private authservice: authservice) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async loginUser(@Request() req): Promise<any> {
        return await this.authservice.loginUser(req.user)
    }
}