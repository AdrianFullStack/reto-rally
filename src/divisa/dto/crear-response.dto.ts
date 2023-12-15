import { ApiProperty } from "@nestjs/swagger";

export class CrearResponseDto {
  @ApiProperty({ example: '100', description: 'Id autoincremental' })
  readonly id: number;

  constructor({ id }) {
    this.id = id
  }
}