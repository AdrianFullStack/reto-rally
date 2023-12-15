import { Injectable } from '@nestjs/common';
import { Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Divisa } from '../models/divisa.entity';
import { UpdateDto } from './dto/update.dto';
import * as moment from 'moment'

@Injectable()
export class DivisaService {
    constructor(
        @InjectRepository(Divisa)
        private divisaRepository: Repository<Divisa>,
    ) { }

    public async find({ tipo, monedaOrigen, monedaDestino }): Promise<any> {
        return this.divisaRepository.findOneBy({
            tipo,
            monedaOrigen,
            monedaDestino,
            fecha: Raw((alias) => `DATE(${alias}) = :date`, { date: moment().format('YYYY-MM-DD') }),
        });
    }
    
    public async create(divisa: Divisa): Promise<Divisa> {
        return this.divisaRepository.save(divisa);
    }

    public async update(id: number, params: UpdateDto) {
        const { affected } = await this.divisaRepository.update(id, params)
        return affected > 0
    }
}