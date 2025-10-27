import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseIntPipe,
    Delete,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { PlansService } from './plans.service.js';
import { CreatePlanDto } from './dto/plan.dto.js';
import { CreatePlanEntitlementDto } from './dto/plan-entitlement.dto.js';
import { CookieInterceptor } from '../../core/sessions/cookie.interceptor.js';

@Controller('plans')
@UseInterceptors(CookieInterceptor)
export class PlansController {
    constructor(private readonly plansService: PlansService) { }

    @Get()
    async getAll() {
        return this.plansService.findAll();
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.plansService.findById(id);
    }

    @Post()
    async create(@Body() body: CreatePlanDto) {
        return this.plansService.createPlan(body);
    }

    @Post(':id/entitlements')
    async addEntitlement(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CreatePlanEntitlementDto,
    ) {
        return this.plansService.addEntitlement(id, body);
    }

    @Put(':id/toggle')
    async toggle(@Param('id', ParseIntPipe) id: number) {
        return this.plansService.toggleStatus(id);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.plansService.deletePlan(id);
    }
}
