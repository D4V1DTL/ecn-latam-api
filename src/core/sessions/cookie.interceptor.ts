import {
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SessionService } from './session.service.js';
import { ICustomInteceptRequest } from './models/interface/custom-intercept-request.interface.js';

/**
 * Interceptor que valida el token del usuario
 * usando cookies (para Web) o headers (para Mobile API)
 */
@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly sessionService: SessionService,
  ) { }

  async intercept(context, next) {
    const request: ICustomInteceptRequest = context.switchToHttp().getRequest();
    const token =
      request.cookies?.['cleep_access'] || // web cookie
      request.headers['authorization']?.replace('Bearer ', ''); // mobile token

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET_AUTH'),
      });

      // Validar sesión en la BD
      const session = await this.sessionService.findSessionById(payload.session_id);
      if (!session) {
        throw new UnauthorizedException('Session not found');
      }

      // Asociar usuario a la request
      payload.user_id = session.user.id;
      request.TOKEM_REQUEST_KEY = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        // Token expirado → limpiar sesiones
        const payload = this.jwtService.decode(token);
        if (payload?.session_id) {
          const expiredSession = await this.sessionService.findSessionById(payload.session_id);
          if (expiredSession) {
            await this.sessionService.deleteSessionsByUserIdAndDate(
              expiredSession.user.id,
              expiredSession.createdAt,
            );
          }
        }
        throw new UnauthorizedException('Token expired. Sessions cleared.');
      }
      throw new UnauthorizedException('Invalid token');
    }

    return next.handle();
  }
}
