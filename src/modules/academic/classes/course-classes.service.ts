import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseClass } from '../../../core/entities/courses/courseClass.entity.js';
import { PurchaseEntitlementsService } from '../../purchases/purchase-entitlements.service.js';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service.js';
import { Course } from '../../../core/entities/index.js';

@Injectable()
export class CourseClassesService {
    constructor(
        @InjectRepository(CourseClass)
        private readonly classRepo: Repository<CourseClass>,
        @InjectRepository(Course)
        private readonly courseRepo: Repository<Course>,
        private readonly entitlementsService: PurchaseEntitlementsService,
        private readonly subscriptionsService: SubscriptionsService,
    ) { }


    async findByCourse(courseId: number, userId?: number) {
        const course = await this.courseRepo.findOne({ where: { id: courseId } });
        if (!course) throw new NotFoundException('Course not found');

        const classes = await this.classRepo.find({
            where: { course: { id: courseId } },
            order: { orderIndex: 'ASC' },
        });

        // ✅ Si el usuario tiene acceso (compra o suscripción), retorna todo
        if (userId && (await this.hasAccess(userId, courseId))) {
            return classes;
        }

        // 🧩 Usuario no autenticado o sin acceso
        const publicClasses = classes.map((cls, index) => {
            if (index < 3) {
                // primeras 3 clases completas (preview)
                return cls;
            } else {
                // clases bloqueadas
                return {
                    id: cls.id,
                    title: cls.title,
                    description: cls.description,
                    durationMinutes: cls.durationMinutes,
                    locked: true,
                };
            }
        });

        return publicClasses;
    }

    /**
     * Verifica si el usuario tiene acceso al curso.
     */
    private async hasAccess(userId: number, courseId: number): Promise<boolean> {
        const hasEntitlement = await this.entitlementsService.hasAccess(
            userId,
            'course',
            courseId,
        );

        if (hasEntitlement) return true;

        // 🔁 Si el curso pertenece a una escuela incluida en el plan
        const course = await this.courseRepo.findOne({
            where: { id: courseId },
            relations: ['school'],
        });

        if (!course) return false;

        const hasPlanAccess = await this.subscriptionsService.userHasAccessToTarget(
            userId,
            course.school?.id,
            'school',
        );

        return !!hasPlanAccess;
    }
}
