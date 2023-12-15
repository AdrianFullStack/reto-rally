import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { constants } from "src/core/config/constants";
import { JwtDto } from "../dto/jwt.dto";
import { AuthService } from "../auth.service";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtDto): Promise<JwtDto> {
        const { sub } = payload
        const user = await this.authService.findByUuid(sub)
        if (!user) throw new UnauthorizedException(constants.TOKEN_NO_VALID)
        if (!user.isActive) throw new UnauthorizedException(constants.USER_INACTIVE)
        return payload;
    }
}