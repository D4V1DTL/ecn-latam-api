import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service.js';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Get()
    async findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return this.coursesService.findById(id);
    }
}
