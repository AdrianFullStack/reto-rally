import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '3.801', description: 'Monto tipo cambio' })
  readonly tipoCambio: number;
}