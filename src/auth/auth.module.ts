import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { IsEmailNotRegistered } from 'src/core/shared/validations/email.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    IsEmailNotRegistered,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ],
})
export class AuthModule {}
