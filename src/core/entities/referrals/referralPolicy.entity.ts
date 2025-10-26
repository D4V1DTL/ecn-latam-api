import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('referral_policies')
export class ReferralPolicy extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        type: 'enum',
        enum: ['global', 'plan', 'product_type', 'product'],
    })
    scope!: 'global' | 'plan' | 'product_type' | 'product';

    @ManyToOne(() => require('../plans/plan.entity.js').Plan, { eager: true, onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'plan_id' })
    plan?: any;

    @Column({
        name: 'product_type',
        type: 'enum',
        enum: ['course', 'bundle', 'event'],
        nullable: true,
    })
    productType?: 'course' | 'bundle' | 'event';

    @Column({ name: 'product_id', type: 'bigint', nullable: true })
    productId?: number;

    @Column({ name: 'first_month_user_pct', type: 'decimal', precision: 5, scale: 2, default: 90.0 })
    firstMonthUserPct!: number;

    @Column({ name: 'next_months_user_pct', type: 'decimal', precision: 5, scale: 2, default: 10.0 })
    nextMonthsUserPct!: number;

    @Column({ name: 'include_events', type: 'tinyint', default: 0 })
    includeEvents!: boolean;

    @Column({ type: 'tinyint', default: 1 })
    active!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
