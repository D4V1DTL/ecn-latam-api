import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('payments')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('../users/user.entity.js').User, (u: any) => u.payments, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'payer_id' })
    payer!: any;

    @ManyToOne(
        () => require('../plans/subscription.entity.js').Subscription,
        { eager: true, onDelete: 'SET NULL' },
    )
    @JoinColumn({ name: 'subscription_id' })
    subscription?: any;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount!: number;

    @Column({ length: 10, default: 'USD' })
    currency!: string;

    @Column({
        type: 'enum',
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
    })
    status!: 'pending' | 'completed' | 'failed' | 'refunded';

    @Column({ name: 'payment_method', length: 50, nullable: true })
    paymentMethod?: string;

    @Column({ name: 'transaction_ref', length: 255, nullable: true })
    transactionRef?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @OneToMany(() => require('./paymentItem.entity.js').PaymentItem, (pi: any) => pi.payment)
    items!: any[];
}
