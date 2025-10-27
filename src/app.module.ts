import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './core/functions/data-source.js';
import { UsersModule } from './modules/users/users.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';
import { PlansModule } from './modules/plans/plans.module.js';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module.js';
import { PaymentsModule } from './modules/payments/payments.module.js';
import { PurchaseEntitlementsModule } from './modules/purchases/purchases.module.js';
import { SchoolsModule } from './modules/academic/schools/schools.module.js';
import { CoursesModule } from './modules/academic/courses/courses.module.js';
import { CourseClassesModule } from './modules/academic/classes/classes.module.js';
import { CourseMaterialsModule } from './modules/academic/materials/materials.module.js';
import { ReferralsModule } from './modules/referrals/referrals.module.js';
import { ReferralCommissionsModule } from './modules/referrals-commissions/referral-commissions.module.js';
import { EventsModule } from './modules/events/events.module.js';
import { EventRegistrationsModule } from './modules/event-registrations/event-registrations.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    UsersModule,
    NotificationsModule,
    PlansModule,
    SubscriptionsModule,
    PaymentsModule,
    PurchaseEntitlementsModule,
    SchoolsModule,
    CoursesModule,
    CourseClassesModule,
    CourseMaterialsModule,
    ReferralsModule,
    ReferralCommissionsModule,
    EventsModule,
    EventRegistrationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
