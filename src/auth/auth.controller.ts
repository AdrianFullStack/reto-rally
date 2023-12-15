import { Body, Controller, ForbiddenException, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2'

import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.request.dto';
import { RegisterRequestDto } from './dto/register.request.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { User } from 'src/models/user.entity';
import { constants } from '../core/config/constants'
import { RegisterResponseDto } from './dto/register.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Login',
    type: RegisterResponseDto,
  })
  async login(@Body() params: LoginRequestDto): Promise<RegisterResponseDto> {
    const user = await this.authService.findByEmail(params.email)
    if (!user) throw new UnauthorizedException(constants.MESSAGE_UNAUTHORIZED)
    const passwordMatches = await argon2.verify(user.password, params.password)
    if (!passwordMatches) throw new UnauthorizedException(constants.MESSAGE_UNAUTHORIZED)
    const tokens = await this.getTokens(user)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return new RegisterResponseDto({ data: { ...user }, ...tokens })
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @ApiOkResponse()
  @ApiBearerAuth()
  logout(@Req() req: Request) {
    console.log('REQUEST', req['user'].sub)
    return this.updateRefreshToken(req['user'].sub)
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Refresh Token',
    type: RegisterResponseDto,
  })
  async refreshTokens(@Req() req: Request): Promise<RegisterResponseDto> {
    const id = req['user'].sub;
    const refreshToken = req['user'].refreshToken;

    const user = await this.authService.findByUuid(id);
    if (!user || !user.refreshToken) throw new ForbiddenException(constants.ACCESS_DENIED);
    const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException(constants.ACCESS_DENIED);
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return new RegisterResponseDto({ data: { ...user }, ...tokens });
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Registro agregado',
    type: RegisterResponseDto,
  })
  async register(@Body() params: RegisterRequestDto): Promise<RegisterResponseDto> {
    const hashPassword = await argon2.hash(params.password)
    const user = await this.authService.create({ ...params, password: hashPassword })
    const tokens = await this.getTokens(user)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return new RegisterResponseDto({ data: { ...user }, ...tokens })
  }

  private async updateRefreshToken(id: number, refreshToken: string = null) {
    const hashRefreshToken = refreshToken ? await argon2.hash(refreshToken) : null
    await this.authService.updateRefreshToken(id, hashRefreshToken)
  }

  private async getTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.id, email: user.email, lastName: user.lastName, firstName: user.name },
        { secret: this.configService.get<string>('JWT_ACCESS_SECRET'), expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: user.id, email: user.email, lastName: user.lastName, firstName: user.name },
        { secret: this.configService.get<string>('JWT_REFRESH_SECRET'), expiresIn: '7d' },
      )
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
