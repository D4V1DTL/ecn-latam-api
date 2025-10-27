import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './session.service.js';
import { UserSession } from '../../core/entities/users/user-session.entity.js';
import { JwtService } from '@nestjs/jwt';
import { CookieInterceptor } from './cookie.interceptor.js';
import { OptionalCookieInterceptor } from './optional-cookie.interceptor.js';

@Module({
  imports: [TypeOrmModule.forFeature([UserSession])],
  providers: [SessionService, JwtService, CookieInterceptor, OptionalCookieInterceptor],
  exports: [SessionService, JwtService, CookieInterceptor, OptionalCookieInterceptor],
})
export class SessionsModule { }
