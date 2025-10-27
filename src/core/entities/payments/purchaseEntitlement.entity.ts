import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('purchase_entitlements')
@Unique(['user', 'targetType', 'targetId'])
export class PurchaseEntitlement extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('../users/user.entity.js').User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: any;

    @ManyToOne(() => require('./paymentItem.entity.js').PaymentItem, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'payment_item_id' })
    paymentItem!: any;

    @Column({
        name: 'target_type',
        type: 'enum',
        enum: ['school', 'course', 'bundle', 'event'],
    })
    targetType!: 'school' | 'course' | 'bundle' | 'event';

    @Column({ name: 'target_id', type: 'bigint' })
    targetId!: number;

    @Column({ name: 'start_date', type: 'date' })
    startDate!: Date;

    @Column({ name: 'end_date', type: 'date', nullable: true })
    endDate?: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
