import { ApiProperty } from "@nestjs/swagger";

export class ConsultaResponseDto {
  @ApiProperty({ example: '100', description: 'Monto' })
  readonly monto: number;

  @ApiProperty({ example: '26.1', description: 'Monto con tipo de cambio' })
  readonly montoConTipoCambio: number;

  @ApiProperty({ example: 'PEN', description: 'Soles' })
  readonly monedaOrigen: string;

  @ApiProperty({ example: 'USD', description: 'Dolares' })
  readonly monedaDestino: string;

  @ApiProperty({ example: 'C', description: 'Tipo cambio' })
  readonly tipo: string;

  @ApiProperty({ example: '0.261', description: 'Monto tipo cambio' })
  readonly tipoCambio: number;

  constructor({ tipoCambio, monedaOrigen, monedaDestino, tipo, monto }) {
    this.monto = monto
    this.monedaDestino = monedaDestino
    this.monedaOrigen = monedaOrigen
    this.tipo = tipo
    this.tipoCambio = tipoCambio
    this.montoConTipoCambio = Number((monto * tipoCambio).toFixed(3))
  }
}