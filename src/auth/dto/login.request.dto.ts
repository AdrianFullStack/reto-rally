import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class LoginRequestDto {
    @IsEmail()
    @ApiProperty({ example: 'rogelio.ast@gmail.com' })
    email: string

    @IsString()
    @MinLength(8)
    @ApiProperty({ example: '1234567890' })
    password: string
}