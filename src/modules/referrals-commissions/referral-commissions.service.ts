import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referral } from '../../core/entities/referrals/referral.entity.js';
import { ReferralCommission } from '../../core/entities/referrals/referralCommission.entity.js';
import { ReferralPolicy } from '../../core/entities/referrals/referralPolicy.entity.js';
import { Payment } from '../../core/entities/payments/payment.entity.js';
import { NotificationsService } from '../notifications/notifications.service.js';

@Injectable()
export class ReferralCommissionsService {
    constructor(
        @InjectRepository(Referral)
        private readonly referralsRepo: Repository<Referral>,
        @InjectRepository(ReferralCommission)
        private readonly commissionsRepo: Repository<ReferralCommission>,
        @InjectRepository(ReferralPolicy)
        private readonly policiesRepo: Repository<ReferralPolicy>,
        private readonly notificationsService: NotificationsService,
    ) { }

    /**
     * Crea automáticamente comisiones por pago completado.
     */
    async handlePaymentCommission(payment: Payment) {
        // Buscar si el pagador fue referido
        const referral = await this.referralsRepo.findOne({
            where: { referred: { id: payment.payer.id }, active: true },
            relations: ['referrer', 'referred'],
        });

        if (!referral) return; // No fue referido, no aplica comisión

        // Buscar política activa (usa la más general "global" si existe)
        const policy =
            (await this.policiesRepo.findOne({ where: { active: true, scope: 'global' } })) ||
            (await this.policiesRepo.findOne({ where: { active: true }, order: { id: 'DESC' } }));

        if (!policy) return;

        // Calcular comisión según fase (primera compra o posteriores)
        const phase: 'first_month' | 'next_month' =
            (await this.commissionsRepo.count({
                where: { referred: { id: referral.referred.id } },
            })) === 0
                ? 'first_month'
                : 'next_month';

        const pct =
            phase === 'first_month' ? Number(policy.firstMonthUserPct) : Number(policy.nextMonthsUserPct);
        const commissionAmount = (Number(payment.amount) * pct) / 100;

        // Registrar comisión
        const commission = this.commissionsRepo.create({
            referrer: referral.referrer,
            referred: referral.referred,
            payment,
            periodMonth: new Date(),
            commissionAmount,
            phase,
            status: 'pending',
        });
        await this.commissionsRepo.save(commission);

        // Notificar al referrer
        await this.notificationsService.create(referral.referrer.id, {
            title: 'Nueva comisión generada',
            message: `Tu referido ${referral.referred.name || referral.referred.email} ha completado un pago. 
      Se generó una comisión de $${commissionAmount.toFixed(2)} (${pct}%).`,
            type: 'referral',
        });

        return commission;
    }

    async getSummaryByUser(userId: number) {
        const rows = await this.commissionsRepo
            .createQueryBuilder('c')
            .select('c.status', 'status')
            .addSelect('SUM(c.commissionAmount)', 'total')
            .where('c.referrer_id = :userId', { userId })
            .groupBy('c.status')
            .getRawMany();

        const summary = {
            pending: 0,
            payable: 0,
            paid: 0,
            total: 0,
        };

        for (const row of rows) {
            const status = row.status as keyof typeof summary;
            summary[status] = Number(row.total);
            summary.total += Number(row.total);
        }

        return summary;
    }

    async findByUser(userId: number) {
        return this.commissionsRepo.find({
            where: { referrer: { id: userId } },
            relations: ['referred', 'payment'],
            order: { createdAt: 'DESC' },
        });
    }
}
