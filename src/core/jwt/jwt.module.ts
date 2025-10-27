import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from './jwt.service.js';

@Module({
  imports: [
    ConfigModule,
    NestJwtModule.register({}), // Configuración vacía, se manejará en el servicio
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule { }
