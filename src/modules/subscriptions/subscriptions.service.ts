import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Subscription } from '../../core/entities/plans/subscription.entity.js';
import { Plan } from '../../core/entities/plans/plan.entity.js';
import { User } from '../../core/entities/users/user.entity.js';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto/subscription.dto.js';
import { NotificationsService } from '../notifications/notifications.service.js';

@Injectable()
export class SubscriptionsService {
    constructor(
        @InjectRepository(Subscription)
        private readonly subsRepo: Repository<Subscription>,

        @InjectRepository(Plan)
        private readonly plansRepo: Repository<Plan>,

        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,

        private readonly notificationsService: NotificationsService,
    ) { }

    async createSubscription(data: CreateSubscriptionDto) {
        const { userId, planId, autoRenew } = data;

        const user = await this.usersRepo.findOne({ where: { id: userId } });
        const plan = await this.plansRepo.findOne({ where: { id: planId } });

        if (!user || !plan) {
            throw new NotFoundException('User or plan not found');
        }

        // calcular fechas
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + plan.durationMonths);

        const existingActive = await this.subsRepo.findOne({
            where: { user: { id: userId }, plan: { id: planId }, isActive: true },
        });
        if (existingActive) {
            throw new BadRequestException('User already has an active subscription to this plan');
        }

        const subscription = this.subsRepo.create({
            user,
            plan,
            startDate,
            endDate,
            isActive: true,
            autoRenew: autoRenew ?? true,
        });
        await this.subsRepo.save(subscription);

        // notificar usuario
        await this.notificationsService.create(userId, {
            title: 'Suscripción activada',
            message: `Te suscribiste al plan ${plan.name} por ${plan.durationMonths} meses.`,
            type: 'subscription',
        });

        return subscription;
    }

    async getUserSubscriptions(userId: number) {
        return this.subsRepo.find({
            where: { user: { id: userId } },
            relations: ['plan'],
            order: { createdAt: 'DESC' },
        });
    }

    async updateSubscription(id: number, data: UpdateSubscriptionDto) {
        const sub = await this.subsRepo.findOne({ where: { id } });
        if (!sub) throw new NotFoundException('Subscription not found');

        Object.assign(sub, data);
        return this.subsRepo.save(sub);
    }

    async deactivateExpired() {
        const today = new Date();
        const expired = await this.subsRepo.find({
            where: {
                isActive: true,
                endDate: Between(new Date('1900-01-01'), today),
            },
            relations: ['user', 'plan'],
        });

        for (const s of expired) {
            s.isActive = false;
            await this.subsRepo.save(s);
            await this.notificationsService.create(s.user.id, {
                title: 'Suscripción vencida',
                message: `Tu plan ${s.plan.name} ha expirado.`,
                type: 'subscription',
            });
        }

        return { message: `${expired.length} suscripciones vencidas desactivadas.` };
    }

    async userHasAccessToTarget(
        userId: number,
        targetId: number,
        targetType: 'school' | 'course' | 'bundle',
    ): Promise<boolean> {
        const today = new Date();

        const sub = await this.subsRepo.findOne({
            where: {
                user: { id: userId },
                isActive: true,
                startDate: LessThanOrEqual(today),
                endDate: MoreThanOrEqual(today),
            },
            relations: ['plan', 'plan.entitlements'],
        });

        if (!sub) return false;

        // Buscar si el plan del usuario incluye acceso al target solicitado
        return sub.plan.entitlements.some(
            (e) =>
                e.targetType === targetType &&
                (e.targetId === null || e.targetId === targetId),
        );
    }

}
