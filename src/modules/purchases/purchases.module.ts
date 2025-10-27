import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseEntitlement } from '../../core/entities/payments/purchaseEntitlement.entity.js';
import { User } from '../../core/entities/users/user.entity.js';
import { PaymentItem } from '../../core/entities/payments/paymentItem.entity.js';
import { PurchaseEntitlementsService } from './purchase-entitlements.service.js';
import { PurchaseEntitlementsController } from './purchase-entitlements.controller.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { JwtModule } from '../../core/jwt/jwt.module.js';
import { SessionsModule } from '../../core/sessions/sessions.module.js';

@Module({
    imports: [
        SessionsModule,
        JwtModule,
        TypeOrmModule.forFeature([PurchaseEntitlement, User, PaymentItem]),
        NotificationsModule,
    ],
    controllers: [PurchaseEntitlementsController],
    providers: [PurchaseEntitlementsService],
    exports: [PurchaseEntitlementsService],
})
export class PurchaseEntitlementsModule { }
