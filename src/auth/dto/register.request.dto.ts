import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { EmailNotRegistered } from "src/core/shared/validations/email.validation"

export class RegisterRequestDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({ example: 'Suclupe Tello' })
    name: string

    @IsOptional()
    @ApiProperty({ example: 'Suclupe Tello' })
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    @EmailNotRegistered({ message: 'email already registered' })
    @ApiProperty({ example: 'rogelio.ast@gmail.com' })
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({ example: '1234567890' })
    password: string
}