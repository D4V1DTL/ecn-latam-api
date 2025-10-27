import { Controller, Get } from '@nestjs/common';
import { SchoolsService } from './schools.service.js';

@Controller('schools')
export class SchoolsController {
    constructor(private readonly schoolsService: SchoolsService) { }

    @Get()
    async findAll() {
        return this.schoolsService.findAll();
    }
}
