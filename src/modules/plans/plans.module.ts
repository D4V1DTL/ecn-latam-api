import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from '../../core/entities/plans/plan.entity.js';
import { PlanEntitlement } from '../../core/entities/plans/planEntitlement.entity.js';
import { PlansService } from './plans.service.js';
import { PlansController } from './plans.controller.js';
import { SessionsModule } from '../../core/sessions/sessions.module.js';
import { JwtModule } from '../../core/jwt/jwt.module.js';

@Module({
    imports: [
        SessionsModule,
        JwtModule,
        TypeOrmModule.forFeature([Plan, PlanEntitlement])],
    controllers: [PlansController],
    providers: [PlansService],
    exports: [PlansService],
})
export class PlansModule { }
