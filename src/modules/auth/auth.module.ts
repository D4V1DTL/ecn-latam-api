import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { User } from '../../core/entities/users/user.entity.js';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '../../core/mail/mail.module.js';
import { UserSession } from '../../core/entities/users/user-session.entity.js';
import { SessionsModule } from '../../core/sessions/sessions.module.js';
import { JwtModule } from '../../core/jwt/jwt.module.js';

@Module({
    imports: [
        ConfigModule,
        SessionsModule,
        MailModule,
        JwtModule,
        TypeOrmModule.forFeature([User, UserSession]),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
