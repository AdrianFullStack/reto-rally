import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'USD', description: 'Moneda Origen' })
  monedaOrigen: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'PEN', description: 'Moneda Destino' })
  monedaDestino: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'C', description: 'Compara' })
  tipo: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2023-12-15', description: 'Fecha' })
  fecha: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '3.801', description: 'Monto tipo cambio' })
  tipoCambio: number;
}