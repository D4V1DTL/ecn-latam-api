import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseClassesController } from './course-classes.controller.js';
import { CourseClassesService } from './course-classes.service.js';
import { CourseClass } from '../../../core/entities/courses/courseClass.entity.js';
import { Course } from '../../../core/entities/courses/course.entity.js';
import { PurchaseEntitlementsModule } from '../../purchases/purchases.module.js';
import { SubscriptionsModule } from '../../subscriptions/subscriptions.module.js';
import { SessionsModule } from '../../../core/sessions/sessions.module.js';
import { JwtModule } from '../../../core/jwt/jwt.module.js';

@Module({
    imports: [
        SessionsModule,
        JwtModule,
        TypeOrmModule.forFeature([CourseClass, Course]),
        PurchaseEntitlementsModule,
        SubscriptionsModule,
    ],
    controllers: [CourseClassesController],
    providers: [CourseClassesService],
    exports: [CourseClassesService],
})
export class CourseClassesModule { }
