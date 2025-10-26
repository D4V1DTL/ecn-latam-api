import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('subscription_entitlements')
@Unique(['subscription', 'targetType', 'targetId'])
export class SubscriptionEntitlement extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(
        () => require('./subscription.entity.js').Subscription,
        (s: any) => s.entitlements,
        { eager: true, onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'subscription_id' })
    subscription!: any;

    @Column({
        name: 'target_type',
        type: 'enum',
        enum: ['platform', 'school', 'course', 'bundle'],
    })
    targetType!: 'platform' | 'school' | 'course' | 'bundle';

    @Column({ name: 'target_id', type: 'bigint', nullable: true })
    targetId?: number;

    @Column({ name: 'start_date', type: 'date' })
    startDate!: Date;

    @Column({ name: 'end_date', type: 'date' })
    endDate!: Date;
}
