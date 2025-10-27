import { Controller, Get, Param, Req, UseInterceptors, ForbiddenException } from '@nestjs/common';
import { CourseMaterialsService } from './course-materials.service.js';
import { CookieInterceptor } from '../../../core/sessions/cookie.interceptor.js';
import { ICustomInteceptRequest } from '../../../core/sessions/models/interface/custom-intercept-request.interface.js';
import { PurchaseEntitlementsService } from '../../purchases/purchase-entitlements.service.js';
import { CourseClassesService } from '../classes/course-classes.service.js';

@Controller('classes/:classId/materials')
@UseInterceptors(CookieInterceptor)
export class CourseMaterialsController {
    constructor(
        private readonly materialsService: CourseMaterialsService,
        private readonly entitlementsService: PurchaseEntitlementsService,
        private readonly classesService: CourseClassesService,
    ) { }

    @Get()
    async findByClass(@Param('classId') classId: number, @Req() req: ICustomInteceptRequest) {
        const userId = req?.TOKEM_REQUEST_KEY?.user_id;
        if (!userId) throw new ForbiddenException('Login required to access materials');

        // Obtener curso del material
        const cls = await this.classesService['classRepo'].findOne({
            where: { id: classId },
            relations: ['course'],
        });
        if (!cls) throw new ForbiddenException('Class not found');

        const hasAccess = await this.entitlementsService.hasAccess(userId, 'course', cls.course.id);
        if (!hasAccess) throw new ForbiddenException('You must purchase this course to access materials');

        return this.materialsService.findByClass(classId);
    }
}
