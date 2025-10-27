import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../core/entities/events/event.entity.js';
import { EventsService } from './events.service.js';
import { EventsController } from './events.controller.js';
import { SessionsModule } from '../../core/sessions/sessions.module.js';
import { JwtModule } from '../../core/jwt/jwt.module.js';
import { PurchaseEntitlementsModule } from '../purchases/purchases.module.js';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module.js';

@Module({
    imports: [
        SessionsModule,
        JwtModule,
        TypeOrmModule.forFeature([Event]),
        PurchaseEntitlementsModule,
        SubscriptionsModule,
    ],
    providers: [EventsService],
    controllers: [EventsController],
    exports: [EventsService],
})
export class EventsModule { }
