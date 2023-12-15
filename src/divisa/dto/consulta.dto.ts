import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConsultaDto {
  @IsString()
  @ApiProperty({ example: 100, required: true })
  readonly monto: string;

  @IsString()
  @ApiProperty({ example: 'USD', required: true })
  readonly monedaOrigen: string;

  @IsString()
  @ApiProperty({ example: 'PEN', required: true })
  readonly monedaDestino: string;

  @IsString()
  @ApiProperty({ example: 'C', required: true })
  readonly tipo: string;
}