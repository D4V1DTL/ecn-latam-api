import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../../../core/entities/courses/course.entity.js';
@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepo: Repository<Course>,
    ) { }

    async findAll() {
        return this.courseRepo.find({
            where: { isPublished: true },
            order: { createdAt: 'DESC' },
        });
    }

    async findById(id: number) {
        const course = await this.courseRepo.findOne({ where: { id } });
        if (!course) throw new NotFoundException('Course not found');
        return course;
    }
}
