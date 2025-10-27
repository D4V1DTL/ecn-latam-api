import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {
  }

  // Generar un token para autenticación
  generateAuthToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_AUTH'),
      expiresIn: Number(this.configService.get<string>('JWT_EXPIRES_IN_AUTH')),
    });
  }

  // Validar un token
  verifyToken(token: string): any {
    return this.jwtService.verify(token, { secret: this.configService.get<string>('JWT_SECRET_AUTH') });
  }
}
