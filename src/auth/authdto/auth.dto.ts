import { IsNotEmpty, IsNumber } from "class-validator"

export class AuthDto {

    @IsNumber()
    @IsNotEmpty()
    Enrollment: number

    @IsNotEmpty()
    Password: String
}