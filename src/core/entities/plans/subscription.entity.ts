import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('subscriptions')
@Index('idx_sub_user', ['user'])
@Index('idx_sub_active', ['isActive', 'endDate'])
export class Subscription extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('../users/user.entity.js').User, (user: any) => user.subscriptions, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user!: any;

    @ManyToOne(() => require('./plan.entity.js').Plan, (plan: any) => plan.subscriptions, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'plan_id' })
    plan!: any;

    @Column({ name: 'start_date', type: 'date' })
    startDate!: Date;

    @Column({ name: 'end_date', type: 'date' })
    endDate!: Date;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    isActive!: boolean;

    @Column({ name: 'auto_renew', type: 'tinyint', default: 1 })
    autoRenew!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @OneToMany(
        () => require('./subscriptionEntitlement.entity.js').SubscriptionEntitlement,
        (e: any) => e.subscription,
    )
    entitlements!: any[];
}
