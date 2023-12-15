import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterRequestDto } from './dto/register.request.dto';
import { User } from 'src/models/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User> 
    ) { }

    public async findByUuid(id: number) {
        return this.userRepository.findOneBy({ id })
    }

    public async findByEmail(email: string) {
        return this.userRepository.findOneBy({ email })
    }

    public async create(params: RegisterRequestDto) {
        return this.userRepository.save(params)
    }

    public async updateRefreshToken(id: number, refreshToken: string) {
        return this.userRepository.update(id, { refreshToken }).catch(e => console.log('error', e))
    } 
}
