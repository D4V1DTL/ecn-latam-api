import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from '../../../core/entities/courses/school.entity.js';

@Injectable()
export class SchoolsService {
    constructor(
        @InjectRepository(School)
        private readonly schoolRepo: Repository<School>,
    ) { }

    async findAll() {
        return this.schoolRepo.find({ where: { isActive: true }, order: { createdAt: 'DESC' } });
    }

    async findById(id: number) {
        const school = await this.schoolRepo.findOne({ where: { id } });
        if (!school) throw new NotFoundException('School not found');
        return school;
    }
}
