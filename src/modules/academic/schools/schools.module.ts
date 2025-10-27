import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from '../../../core/entities/courses/school.entity.js';
import { SchoolsController } from './schools.controller.js';
import { SchoolsService } from './schools.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([School])],
    controllers: [SchoolsController],
    providers: [SchoolsService],
    exports: [SchoolsService],
})
export class SchoolsModule { }
