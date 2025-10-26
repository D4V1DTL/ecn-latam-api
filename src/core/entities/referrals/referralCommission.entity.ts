import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('referral_commissions')
@Index('idx_comm_referrer_period', ['referrer', 'periodMonth'])
@Index('idx_comm_referred_period', ['referred', 'periodMonth'])
export class ReferralCommission extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('../users/user.entity.js').User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'referrer_id' })
    referrer!: any;

    @ManyToOne(() => require('../users/user.entity.js').User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'referred_id' })
    referred!: any;

    @ManyToOne(() => require('../payments/payment.entity.js').Payment, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'payment_id' })
    payment!: any;

    @Column({ name: 'period_month', type: 'date' })
    periodMonth!: Date;

    @Column({ name: 'commission_amount', type: 'decimal', precision: 10, scale: 2 })
    commissionAmount!: number;

    @Column({
        type: 'enum',
        enum: ['first_month', 'next_month'],
    })
    phase!: 'first_month' | 'next_month';

    @Column({
        type: 'enum',
        enum: ['pending', 'payable', 'paid', 'canceled'],
        default: 'pending',
    })
    status!: 'pending' | 'payable' | 'paid' | 'canceled';

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
