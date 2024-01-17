import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class authGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
}