import { Controller, Get, Param, Req, UseInterceptors } from '@nestjs/common';
import { CourseClassesService } from './course-classes.service.js';
import { OptionalCookieInterceptor } from '../../../core/sessions/optional-cookie.interceptor.js';
import { ICustomInteceptRequest } from '../../../core/sessions/models/interface/custom-intercept-request.interface.js';

@Controller('courses/:courseId/classes')
@UseInterceptors(OptionalCookieInterceptor)
export class CourseClassesController {
    constructor(private readonly classesService: CourseClassesService) { }

    @Get()
    async findByCourse(@Param('courseId') courseId: number, @Req() req: ICustomInteceptRequest) {
        const userId = req?.TOKEM_REQUEST_KEY?.user_id ?? null;
        return this.classesService.findByCourse(courseId, userId);
    }
}
