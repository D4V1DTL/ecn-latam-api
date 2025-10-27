import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referral } from '../../core/entities/referrals/referral.entity.js';
import { ReferralCommission } from '../../core/entities/referrals/referralCommission.entity.js';
import { ReferralPolicy } from '../../core/entities/referrals/referralPolicy.entity.js';
import { ReferralCommissionsService } from './referral-commissions.service.js';
import { NotificationsModule } from '../notifications/notifications.module.js';
import { ReferralCommissionsController } from './referral-commissions.controller.js';
import { SessionsModule } from '../../core/sessions/sessions.module.js';
import { JwtModule } from '../../core/jwt/jwt.module.js';

@Module({
    imports: [
        SessionsModule,
        JwtModule,
        TypeOrmModule.forFeature([Referral, ReferralCommission, ReferralPolicy]),
        NotificationsModule,
    ],
    controllers: [ReferralCommissionsController],
    providers: [ReferralCommissionsService],
    exports: [ReferralCommissionsService],
})
export class ReferralCommissionsModule { }
