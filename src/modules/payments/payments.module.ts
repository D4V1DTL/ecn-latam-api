import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../../core/entities/payments/payment.entity.js';
import { PaymentItem } from '../../core/entities/payments/paymentItem.entity.js';
import { User } from '../../core/entities/users/user.entity.js';
import { PaymentsService } from './payments.service.js';
import { PaymentsController } from './payments.controller.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { SessionsModule } from '../../core/sessions/sessions.module.js';
import { JwtModule } from '../../core/jwt/jwt.module.js';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module.js';
import { PurchaseEntitlementsModule } from '../purchases/purchases.module.js';
import { ReferralCommissionsModule } from '../referrals-commissions/referral-commissions.module.js';

@Module({
    imports: [
        SessionsModule,
        JwtModule,
        TypeOrmModule.forFeature([Payment, PaymentItem, User]),
        NotificationsModule,
        SubscriptionsModule,
        PurchaseEntitlementsModule,
        ReferralCommissionsModule
    ],
    controllers: [PaymentsController],
    providers: [PaymentsService],
    exports: [PaymentsService],
})
export class PaymentsModule { }
