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

@Entity('event_registrations')
@Unique(['event', 'user'])
export class EventRegistration extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('./event.entity.js').Event, (event: any) => event.registrations, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'event_id' })
    event!: any;

    @ManyToOne(() => require('../users/user.entity.js').User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: any;

    @ManyToOne(() => require('../payments/paymentItem.entity.js').PaymentItem, {
        eager: true,
        onDelete: 'SET NULL',
        nullable: true,
    })
    @JoinColumn({ name: 'payment_item_id' })
    paymentItem?: any;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
