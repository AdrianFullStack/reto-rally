import { ApiProperty } from "@nestjs/swagger"

class Data {
    @ApiProperty({ example: '1' })
    id: number

    @ApiProperty({ example: 'Rogelio Adrián' })
    name: string

    @ApiProperty({ example: 'Suclupe Tello' })
    lastName: string

    constructor({ id, name, lastName }) {
        this.id = id
        this.name = name
        this.lastName = lastName
    }
}

export class RegisterResponseDto {
    @ApiProperty({ example: Data })
    data: Data

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
    accessToken: string

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8' })
    refreshToken: string

    constructor({ data, accessToken, refreshToken }) {
        this.data = new Data(data)
        this.refreshToken = refreshToken
        this.accessToken = accessToken
    }
}