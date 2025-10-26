import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('referral_configs')
export class ReferralConfig extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'default_max_referrals', type: 'int', default: 10 })
    defaultMaxReferrals!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
