import { IsNotEmpty, IsNumber } from "class-validator"

export class AuthDto {

    @IsNotEmpty()
    Enrollment: number

    @IsNotEmpty()
    Password: String
}