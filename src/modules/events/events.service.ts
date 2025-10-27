import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../core/entities/events/event.entity.js';
import { PurchaseEntitlementsService } from '../purchases/purchase-entitlements.service.js';
import { SubscriptionsService } from '../subscriptions/subscriptions.service.js';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepo: Repository<Event>,
        private readonly entitlementsService: PurchaseEntitlementsService,
        private readonly subscriptionsService: SubscriptionsService,
    ) { }

    async findAll(userId?: number) {
        const events = await this.eventsRepo.find({
            where: { isActive: true },
            order: { eventDate: 'ASC' },
        });

        if (!userId) return events;

        // Agregar flag "hasAccess"
        for (const ev of events) {
            ev['hasAccess'] = await this.hasAccess(userId, ev.id);
        }

        return events;
    }

    async findById(id: number, userId?: number) {
        const event = await this.eventsRepo.findOne({ where: { id } });
        if (!event) throw new Error('Evento no encontrado');

        if (userId) {
            event['hasAccess'] = await this.hasAccess(userId, id);
        }

        return event;
    }

    private async hasAccess(userId: number, eventId: number) {
        const hasEntitlement = await this.entitlementsService.hasAccess(userId, 'event', eventId);
        const hasPlanAccess = await this.subscriptionsService.userHasAccessToTarget(
            userId,
            eventId,
            'bundle',
        );
        return hasEntitlement || hasPlanAccess;
    }
}
