import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../../core/entities/notifications/notification.entity.js';
import { User } from '../../core/entities/users/user.entity.js';
import { NotificationsService } from './notifications.service.js';
import { NotificationsController } from './notifications.controller.js';
import { SessionsModule } from '../../core/sessions/sessions.module.js';
import { JwtModule } from '../../core/jwt/jwt.module.js';

@Module({
    imports: [
        SessionsModule,
        JwtModule,
        TypeOrmModule.forFeature([Notification, User])],
    controllers: [NotificationsController],
    providers: [NotificationsService],
    exports: [NotificationsService],
})
export class NotificationsModule { }
