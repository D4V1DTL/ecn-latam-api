import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseMaterial } from '../../../core/entities/courses/courseMaterial.entity.js';

@Injectable()
export class CourseMaterialsService {
    constructor(
        @InjectRepository(CourseMaterial)
        private readonly materialRepo: Repository<CourseMaterial>,
    ) { }


    async findByClass(classId: number) {
        return this.materialRepo.find({
            where: { class: { id: classId } },
            order: { createdAt: 'DESC' as const },
        });
    }
}
