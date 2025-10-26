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

@Entity('notifications')
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('../users/user.entity.js').User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: any;

    @Column({ length: 255, nullable: true })
    title?: string;

    @Column({ type: 'text', nullable: true })
    message?: string;

    @Column({
        type: 'enum',
        enum: ['system', 'subscription', 'referral', 'event', 'payment'],
        default: 'system',
    })
    type!: 'system' | 'subscription' | 'referral' | 'event' | 'payment';

    @Column({ name: 'is_read', type: 'tinyint', default: 0 })
    isRead!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
