import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../core/entities/payments/payment.entity.js';
import { PaymentItem } from '../../core/entities/payments/paymentItem.entity.js';
import { CreatePaymentDto } from './dto/payment.dto.js';
import { User } from '../../core/entities/users/user.entity.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { SubscriptionsService } from '../subscriptions/subscriptions.service.js';
import { PurchaseEntitlementsService } from '../purchases/purchase-entitlements.service.js';
import { ReferralCommissionsService } from '../referrals-commissions/referral-commissions.service.js';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentsRepo: Repository<Payment>,

        @InjectRepository(PaymentItem)
        private readonly itemsRepo: Repository<PaymentItem>,

        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,

        private readonly notificationsService: NotificationsService,

        private readonly subscriptionsService: SubscriptionsService,

        private readonly purchaseEntitlementsService: PurchaseEntitlementsService,

        private readonly referralCommissionsService: ReferralCommissionsService,
    ) { }

    async createPayment(data: CreatePaymentDto) {
        const { payerId, amount, items } = data;
        const user = await this.usersRepo.findOne({ where: { id: payerId } });
        if (!user) throw new NotFoundException('User not found');

        // Crear el pago
        const payment = this.paymentsRepo.create({
            payer: user,
            amount,
            currency: 'USD',
            status: 'completed',
            paymentMethod: data.paymentMethod || 'manual',
            transactionRef: data.transactionRef || `REF-${Date.now()}`,
        });
        const savedPayment = await this.paymentsRepo.save(payment);

        // Crear ítems y detectar si hay un plan
        let planIdForSubscription: number | null = null;
        for (const item of items) {
            const lineTotal = item.unitPrice * (item.quantity ?? 1);
            const pItem = this.itemsRepo.create({
                payment: savedPayment,
                ...item,
                lineTotal,
            });
            await this.itemsRepo.save(pItem);

            if (item.itemType === 'plan') {
                planIdForSubscription = item.itemId;
            } else {
                await this.purchaseEntitlementsService.create({
                    userId: payerId,
                    paymentItemId: pItem.id,
                    targetType: item.itemType,
                    targetId: item.itemId,
                    startDate: new Date().toISOString(),
                });
            }
        }

        // Si hay un plan, crear la suscripción automáticamente
        if (planIdForSubscription) {
            const newSub = await this.subscriptionsService.createSubscription({
                userId: payerId,
                planId: planIdForSubscription,
            });

            savedPayment.subscription = newSub;
            await this.paymentsRepo.save(savedPayment);
        }

        // Notificación
        await this.notificationsService.create(user.id, {
            title: 'Pago procesado',
            message: planIdForSubscription
                ? 'Tu suscripción ha sido activada automáticamente.'
                : `Tu pago de $${amount.toFixed(2)} fue registrado correctamente.`,
            type: 'payment',
        });

        await this.referralCommissionsService.handlePaymentCommission(savedPayment);

        return { message: 'Payment registered successfully', payment: savedPayment };
    }

    async findAll() {
        return this.paymentsRepo.find({
            relations: ['payer', 'subscription', 'items'],
            order: { createdAt: 'DESC' },
        });
    }

    async findByUser(userId: number) {
        return this.paymentsRepo.find({
            where: { payer: { id: userId } },
            relations: ['items', 'subscription'],
            order: { createdAt: 'DESC' },
        });
    }
}
