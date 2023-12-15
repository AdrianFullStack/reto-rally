import { Module } from '@nestjs/common';
import { DivisaController } from './divisa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Divisa } from '../models/divisa.entity';
import { DivisaService } from './divisa.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Divisa ])
  ],
  controllers: [DivisaController],
  providers: [ DivisaService ]
})
export class DivisaModule {}