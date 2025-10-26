import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('plans')
export class Plan extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ name: 'duration_months', type: 'int' })
    durationMonths!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    isActive!: boolean;

    @Column({ name: 'trial_days', type: 'int', default: 0 })
    trialDays!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @OneToMany(() => require('./planEntitlement.entity.js').PlanEntitlement, (e: any) => e.plan)
    entitlements!: any[];

    @OneToMany(() => require('./subscription.entity.js').Subscription, (s: any) => s.plan)
    subscriptions!: any[];
}
