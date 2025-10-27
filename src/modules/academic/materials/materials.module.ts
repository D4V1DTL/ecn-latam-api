import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseMaterialsController } from './course-materials.controller.js';
import { CourseMaterialsService } from './course-materials.service.js';
import { CourseMaterial } from '../../../core/entities/courses/courseMaterial.entity.js';
import { SessionsModule } from '../../../core/sessions/sessions.module.js';
import { JwtModule } from '../../../core/jwt/jwt.module.js';
import { PurchaseEntitlementsModule } from '../../purchases/purchases.module.js';
import { CourseClassesModule } from '../classes/classes.module.js';


@Module({
    imports: [
        SessionsModule,
        JwtModule,
        TypeOrmModule.forFeature([CourseMaterial]),
        PurchaseEntitlementsModule,
        CourseClassesModule
    ],
    controllers: [CourseMaterialsController],
    providers: [CourseMaterialsService],
    exports: [CourseMaterialsService],
})
export class CourseMaterialsModule { }
