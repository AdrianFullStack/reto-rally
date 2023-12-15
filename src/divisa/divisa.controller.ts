import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ConsultaDto } from './dto/consulta.dto';
import { CreateDto } from './dto/crear.dto';
import { DivisaService } from './divisa.service';
import { Divisa } from '../models/divisa.entity';
import { UpdateDto } from './dto/update.dto';
import { ConsultaResponseDto } from './dto/consulta-response.dto';
import { CrearResponseDto } from './dto/crear-response.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiBearerAuth()
@ApiTags('Divisas')
@Controller('divisas')
@UseGuards(AccessTokenGuard)
export class DivisaController {
    constructor(private divisaService: DivisaService){}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Lista de registros',
        type: ConsultaResponseDto,
    })
    async consulta(@Query() query: ConsultaDto): Promise<ConsultaResponseDto> {
        const data = await this.divisaService.find(query)
        return new ConsultaResponseDto({ ...data, monto: query.monto  })
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Registro agregado',
        type: CrearResponseDto,
    })
    async create(@Body() createDto: CreateDto): Promise<CrearResponseDto> {
        const data: Divisa = { ...createDto, id: null }
        const created = await this.divisaService.create(data)
        return new CrearResponseDto(created)
    }

    @Put('/:id')
    @ApiResponse({
        status: 200,
        description: 'Registro actualizado'
    })
    @ApiParam({
        name: 'id',
        description: 'Id divisa',
        example: 2,
        required: true
    })
    update(@Param('id') id: number, @Body() params: UpdateDto) {
        return this.divisaService.update(id, params)
    }
}
