import { Injectable, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SessionService } from './session.service.js';
import { ICustomInteceptRequest } from './models/interface/custom-intercept-request.interface.js';

@Injectable()
export class OptionalCookieInterceptor implements NestInterceptor {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly sessionService: SessionService,
    ) { }

    async intercept(context, next) {
        const request: ICustomInteceptRequest = context.switchToHttp().getRequest();
        const token =
            request.cookies?.['cleep_access'] ||
            request.headers['authorization']?.replace('Bearer ', '');

        if (!token) return next.handle(); // 🚀 No hay token → continuar como usuario anónimo

        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET_AUTH'),
            });

            const session = await this.sessionService.findSessionById(payload.session_id);
            if (session) {
                payload.user_id = session.user.id;
                request.TOKEM_REQUEST_KEY = payload;
            }
        } catch {
            // token inválido o expirado → continuar sin usuario
        }

        return next.handle();
    }
}
