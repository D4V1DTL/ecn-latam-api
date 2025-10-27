import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referral } from '../../core/entities/referrals/referral.entity.js';
import { User } from '../../core/entities/users/user.entity.js';

@Injectable()
export class ReferralsService {
    constructor(
        @InjectRepository(Referral)
        private readonly referralsRepo: Repository<Referral>,
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) { }

    // Crear una relación de referido
    async create(referrerId: number, referredEmail: string) {
        const referrer = await this.usersRepo.findOne({ where: { id: referrerId } });
        const referred = await this.usersRepo.findOne({ where: { email: referredEmail } });

        if (!referrer) throw new BadRequestException('Referrer not found');
        if (!referred) throw new BadRequestException('User not found');
        if (referrer.id === referred.id) throw new BadRequestException('Cannot refer yourself');

        const existing = await this.referralsRepo.findOne({
            where: { referrer: { id: referrer.id }, referred: { id: referred.id } },
        });
        if (existing) throw new BadRequestException('Referral already exists');

        const referral = this.referralsRepo.create({ referrer, referred, active: true });
        await this.referralsRepo.save(referral);

        return { message: 'Referral created successfully', referral };
    }

    // Obtener referidos de un usuario
    async getMyReferrals(referrerId: number) {
        return this.referralsRepo.find({
            where: { referrer: { id: referrerId } },
            order: { createdAt: 'DESC' },
        });
    }
}
