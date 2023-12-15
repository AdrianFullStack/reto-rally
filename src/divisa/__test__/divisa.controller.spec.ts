import { Test, TestingModule } from '@nestjs/testing';
import { DivisaController } from '../divisa.controller';
import { DivisaModule } from '../divisa.module';
import { Divisa } from '../../models/divisa.entity';
import { DivisaService } from '../divisa.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConsultaDto } from '../dto/consulta.dto';
import { ConsultaResponseDto } from '../dto/consulta-response.dto';
import { CrearResponseDto } from '../dto/crear-response.dto';
import { CreateDto } from '../dto/crear.dto';

describe('DivisaController', () => {
  let controller: DivisaController
  let service: DivisaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DivisaModule]
    })
    .overrideProvider(getRepositoryToken(Divisa))
    .useValue(jest.fn())
    .compile();

    controller = module.get<DivisaController>(DivisaController);
    service = module.get<DivisaService>(DivisaService);
  });

  describe('constuta tipo cambio', () => {
    it('must return an Object of type ConsultaResponseDto', async () => {
      jest.spyOn(service, 'find').mockImplementation(() =>
        Promise.resolve({ monedaOrigen: 'USD', monedaDestino: 'PEN', tipo: 'C', tipoCambio: 3.774 } as unknown as Promise<Divisa>));

      const request: ConsultaDto = {
        monedaOrigen: 'USD',
        monedaDestino: 'PEN',
        monto: '100',
        tipo: 'C'
      }
      const result = await controller.consulta(request);
      expect(result instanceof ConsultaResponseDto).toEqual(true)
      expect(service.find).toHaveBeenCalledTimes(1);
    })
  })

  describe('registra tipo cambio', () => {
    it('must return an Object of type CrearResponseDto', async () => {
      jest.spyOn(service, 'create').mockImplementation(() =>
        Promise.resolve({ id: 1, monedaOrigen: 'USD', monedaDestino: 'PEN', tipo: 'C', tipoCambio: 3.774, fecha: '2023-12-12' } as unknown as Promise<Divisa>));

      const request: CreateDto = {
        monedaOrigen: 'USD',
        monedaDestino: 'PEN',
        tipoCambio: 3.801,
        tipo: 'C',
        fecha: new Date('2023-12-20')
      }
      const result = await controller.create(request);
      expect(result instanceof CrearResponseDto).toEqual(true)
      expect(service.create).toHaveBeenCalledTimes(1);
    })
  })

});
