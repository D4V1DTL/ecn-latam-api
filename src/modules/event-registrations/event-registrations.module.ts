import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from '../../core/entities/events/eventRegistration.entity.js';
import { Event } from '../../core/entities/events/event.entity.js';
import { User } from '../../core/entities/users/user.entity.js';
import { EventRegistrationsService } from './event-registrations.service.js';
import { EventRegistrationsController } from './event-registrations.controller.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { SessionsModule } from '../../core/sessions/sessions.module.js';
import { JwtModule } from '../../core/jwt/jwt.module.js';
import { PurchaseEntitlementsModule } from '../purchases/purchases.module.js';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module.js';

@Module({
    imports: [
        SessionsModule,
        JwtModule,
        TypeOrmModule.forFeature([EventRegistration, Event, User]),
        NotificationsModule,
        PurchaseEntitlementsModule,
        SubscriptionsModule,
    ],
    providers: [EventRegistrationsService],
    controllers: [EventRegistrationsController],
    exports: [EventRegistrationsService],
})
export class EventRegistrationsModule { }
