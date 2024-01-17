import { Body, Controller, Get } from "@nestjs/common";
import { authservice } from "./auth.service";
import { AuthDto } from "./authdto/auth.dto";

@Controller("auth")
export class authcontroller {
    constructor(private authservice: authservice) { }

    @Get("signin")
    signin(@Body() dto: AuthDto) {
        return this.authservice.signin(dto);
    }
}