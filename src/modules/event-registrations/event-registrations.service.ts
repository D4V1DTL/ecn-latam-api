import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventRegistration } from '../../core/entities/events/eventRegistration.entity.js';
import { Event } from '../../core/entities/events/event.entity.js';
import { User } from '../../core/entities/users/user.entity.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PurchaseEntitlementsService } from '../purchases/purchase-entitlements.service.js';
import { SubscriptionsService } from '../subscriptions/subscriptions.service.js';

@Injectable()
export class EventRegistrationsService {
    constructor(
        @InjectRepository(EventRegistration)
        private readonly registrationsRepo: Repository<EventRegistration>,
        @InjectRepository(Event)
        private readonly eventsRepo: Repository<Event>,
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        private readonly notificationsService: NotificationsService,
        private readonly entitlementsService: PurchaseEntitlementsService,
        private readonly subscriptionsService: SubscriptionsService,
    ) { }

    async registerUser(eventId: number, userId: number) {
        const event = await this.eventsRepo.findOne({ where: { id: eventId } });
        if (!event || !event.isActive) throw new BadRequestException('Invalid event');
        const user = await this.usersRepo.findOne({ where: { id: userId } });

        if (!user) throw new BadRequestException('User not found');

        const existing = await this.registrationsRepo.findOne({
            where: { event: { id: eventId }, user: { id: userId } },
        });
        if (existing) throw new BadRequestException('User already registered for this event');

        if (event.price > 0) {
            const hasEntitlement = await this.entitlementsService.hasAccess(userId, 'event', eventId);
            const hasPlanAccess = await this.subscriptionsService.userHasAccessToTarget(
                userId,
                eventId,
                'bundle',
            );

            if (!hasEntitlement && !hasPlanAccess) {
                throw new ForbiddenException(
                    'Este evento es de pago. Debes comprarlo o tener una suscripción activa.',
                );
            }
        }

        const registration = this.registrationsRepo.create({ event, user });
        await this.registrationsRepo.save(registration);

        await this.notificationsService.create(user.id, {
            title: 'Registro confirmado',
            message: `Te has registrado al evento "${event.title}" del ${event.eventDate ? event.eventDate.toLocaleString() : ''}.`,
            type: 'event',
        });

        return { message: 'Registration successful', registration };
    }

    async getMyRegistrations(userId: number) {
        return this.registrationsRepo.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }
}
