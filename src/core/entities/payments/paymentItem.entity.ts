import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('payment_items')
@Index('idx_pi_payment', ['payment'])
export class PaymentItem extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('./payment.entity.js').Payment, (p: any) => p.items, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'payment_id' })
    payment!: any;

    @Column({
        name: 'item_type',
        type: 'enum',
        enum: ['plan', 'bundle', 'course', 'event'],
    })
    itemType!: 'plan' | 'bundle' | 'course' | 'event';

    @Column({ name: 'item_id', type: 'bigint' })
    itemId!: number;

    @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 })
    unitPrice!: number;

    @Column({ type: 'int', default: 1 })
    quantity!: number;

    @Column({ name: 'line_total', type: 'decimal', precision: 10, scale: 2 })
    lineTotal!: number;
}
