import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseEntitlement } from '../../core/entities/payments/purchaseEntitlement.entity.js';
import { CreatePurchaseEntitlementDto } from './dto/purchase-entitlement.dto.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PaymentItem } from '../../core/entities/payments/paymentItem.entity.js';
import { User } from '../../core/entities/users/user.entity.js';

@Injectable()
export class PurchaseEntitlementsService {
    constructor(
        @InjectRepository(PurchaseEntitlement)
        private readonly entitlementsRepo: Repository<PurchaseEntitlement>,
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        @InjectRepository(PaymentItem)
        private readonly paymentItemsRepo: Repository<PaymentItem>,
        private readonly notificationsService: NotificationsService,
    ) { }

    async create(data: CreatePurchaseEntitlementDto) {
        const { userId, paymentItemId, targetType, targetId, startDate, endDate } = data;

        const user = await this.usersRepo.findOne({ where: { id: userId } });
        const paymentItem = await this.paymentItemsRepo.findOne({ where: { id: paymentItemId } });

        if (!user || !paymentItem) throw new NotFoundException('User or payment item not found');

        const existing = await this.entitlementsRepo.findOne({
            where: { user: { id: userId }, targetType, targetId },
        });
        if (existing) return existing; // evitar duplicados

        const entitlement = this.entitlementsRepo.create({
            user,
            paymentItem,
            targetType,
            targetId,
            startDate,
            endDate,
        });
        const saved = await this.entitlementsRepo.save(entitlement);

        await this.notificationsService.create(userId, {
            title: 'Acceso habilitado',
            message: `Tienes acceso a un nuevo ${targetType}.`,
            type: 'payment',
        });

        return saved;
    }

    async getUserEntitlements(userId: number) {
        return this.entitlementsRepo.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }

    async hasAccess(
        userId: number,
        targetType: 'bundle' | 'school' | 'course' | 'event',
        targetId: number
    ) {
        const today = new Date();
        const access = await this.entitlementsRepo.findOne({
            where: {
                user: { id: userId },
                targetType,
                targetId,
            },
        });
        if (!access) return false;
        if (access.endDate && new Date(access.endDate) < today) return false;
        return true;
    }
}
