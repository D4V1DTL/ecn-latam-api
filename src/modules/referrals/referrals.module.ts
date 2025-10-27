import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referral } from '../../core/entities/referrals/referral.entity.js';
import { ReferralsService } from './referrals.service.js';
import { ReferralsController } from './referrals.controller.js';
import { User } from '../../core/entities/users/user.entity.js';
import { SessionsModule } from '../../core/sessions/sessions.module.js';
import { JwtModule } from '../../core/jwt/jwt.module.js';

@Module({
    imports: [
        SessionsModule,
        JwtModule,
        TypeOrmModule.forFeature([Referral, User])
    ],
    controllers: [ReferralsController],
    providers: [ReferralsService],
    exports: [ReferralsService],
})
export class ReferralsModule { }
