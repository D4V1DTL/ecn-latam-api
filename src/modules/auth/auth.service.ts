import {
    Injectable,
    BadRequestException,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { User } from '../../core/entities/users/user.entity.js';
import { UserSession } from '../../core/entities/users/user-session.entity.js';
import { MailService } from '../../core/mail/mail.service.js';
import { JwtService } from '../../core/jwt/jwt.service.js';
import { EmailTemplates } from '../../core/mail/enum/email-templates.enum.js';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,

        @InjectRepository(UserSession)
        private readonly sessionsRepo: Repository<UserSession>, // Modelo de sesiones

        private readonly mailService: MailService, // Inyecta el servicio de correo
        private readonly configService: ConfigService, // Inyecta el servicio de configuración
        private readonly jwtService: JwtService, // Inyecta el servicio de JWT
    ) { }

    async login(res, email, password) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid email or password');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid email or password');

        // Crear sesión
        const authToken = await this.generateSessionToken(user, 'web');

        // Enviar email de inicio de sesión
        await this.mailService.sendMailTemplate(
            EmailTemplates.ININT_SESSION,
            user.email,
            { username: user.name, loginDate: new Date().toLocaleString() },
        );

        // Guardar cookie segura (solo en web)
        res.cookie('cleep_access', authToken, {
            httpOnly: false,
            secure: true,
            sameSite:
                this.configService.get('NODE_ENV') === 'production' ? 'strict' : 'none',
            maxAge: 1000 * 60 * 60 * 12, // 12 horas
            domain: this.configService.get('APP_DOMAIN'),
            path: '/',
        });

        return res.status(HttpStatus.OK).json({ message: 'Login successful' });
    }

    async register(email, password, name) {
        const exists = await this.usersRepo.findOne({ where: { email } });
        if (exists) throw new BadRequestException('Email already registered');

        const hashed = await bcrypt.hash(password, 10);
        const user = this.usersRepo.create({ email, password: hashed, name });
        await this.usersRepo.save(user);

        await this.mailService.sendMailTemplate(
            EmailTemplates.VALIDATE_SESSION_CODE,
            email,
            { username: name },
        );

        return { message: 'User created successfully' };
    }

    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException('Invalid session');

        const valid = await bcrypt.compare(oldPassword, user.password);
        if (!valid) throw new BadRequestException('Invalid current password');

        user.password = await bcrypt.hash(newPassword, 10);
        await this.usersRepo.save(user);

        await this.mailService.sendMailTemplate(
            EmailTemplates.CHANGE_PASSWORD,
            user.email,
            { username: user.name },
        );

        return { message: 'Password changed successfully' };
    }

    async recoverPassword(id) {
        const user = await this.usersRepo.findOne({ where: { id } });
        if (!user) throw new BadRequestException('User not found');

        const token = await this.generateSessionToken(user, 'reset');
        const recoveryUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;

        await this.mailService.sendMailTemplate(
            EmailTemplates.RECOVERY_PASSWORD,
            user.email,
            { username: user.name, link: recoveryUrl },
        );

        return { message: 'Recovery email sent' };
    }

    async resetPassword(res, session_id, newPassword) {
        const session = await this.sessionsRepo.findOne({
            where: { id: session_id },
            relations: ['user'],
        });
        if (!session) throw new UnauthorizedException('Invalid token');

        const user = session.user;
        user.password = await bcrypt.hash(newPassword, 10);
        await this.usersRepo.save(user);

        await this.mailService.sendMailTemplate(
            EmailTemplates.CHANGE_PASSWORD,
            user.email,
            { username: user.name },
        );

        // nueva sesión post-reset
        const newToken = await this.generateSessionToken(user, 'web');
        res.cookie('cleep_access', newToken, {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 12,
            path: '/',
        });

        return res.status(HttpStatus.OK).json({ message: 'Password reset successful' });
    }

    async generateSessionToken(user, type = 'web') {
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12); // 12 horas
        const session = this.sessionsRepo.create({
            user,
            refreshToken: '',
            userAgent: type,
            expiresAt,
        });
        const saved = await this.sessionsRepo.save(session);

        const token = this.jwtService.generateAuthToken({ session_id: saved.id });
        saved.refreshToken = token;
        await this.sessionsRepo.save(saved);

        return token;
    }
}