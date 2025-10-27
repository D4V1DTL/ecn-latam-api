import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../../core/entities/plans/plan.entity.js';
import { PlanEntitlement } from '../../core/entities/plans/planEntitlement.entity.js';
import { CreatePlanDto } from './dto/plan.dto.js';
import { CreatePlanEntitlementDto } from './dto/plan-entitlement.dto.js';

@Injectable()
export class PlansService {
    constructor(
        @InjectRepository(Plan)
        private readonly plansRepo: Repository<Plan>,

        @InjectRepository(PlanEntitlement)
        private readonly entitlementsRepo: Repository<PlanEntitlement>,
    ) { }

    async createPlan(data: CreatePlanDto) {
        const plan = this.plansRepo.create(data);
        return this.plansRepo.save(plan);
    }

    async addEntitlement(planId: number, data: CreatePlanEntitlementDto) {
        const plan = await this.plansRepo.findOne({ where: { id: planId } });
        if (!plan) throw new NotFoundException('Plan not found');

        const ent = this.entitlementsRepo.create({
            ...data,
            plan,
        });
        return this.entitlementsRepo.save(ent);
    }

    async findAll() {
        return this.plansRepo.find({
            where: { isActive: true },
            relations: ['entitlements'],
            order: { createdAt: 'DESC' },
        });
    }

    async findById(id: number) {
        const plan = await this.plansRepo.findOne({
            where: { id },
            relations: ['entitlements'],
        });
        if (!plan) throw new NotFoundException('Plan not found');
        return plan;
    }

    async toggleStatus(id: number) {
        const plan = await this.findById(id);
        plan.isActive = !plan.isActive;
        return this.plansRepo.save(plan);
    }

    async deletePlan(id: number) {
        await this.plansRepo.delete(id);
        return { message: 'Plan deleted successfully' };
    }
}
