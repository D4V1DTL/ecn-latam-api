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

@Entity('plan_entitlements')
@Unique(['plan', 'targetType', 'targetId'])
export class PlanEntitlement extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('./plan.entity.js').Plan, (plan: any) => plan.entitlements, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'plan_id' })
    plan!: any;

    @Column({
        name: 'target_type',
        type: 'enum',
        enum: ['platform', 'school', 'course', 'bundle'],
    })
    targetType!: 'platform' | 'school' | 'course' | 'bundle';

    @Column({ name: 'target_id', type: 'bigint', nullable: true })
    targetId?: number;
}
