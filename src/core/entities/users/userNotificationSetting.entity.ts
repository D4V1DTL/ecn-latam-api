import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('user_notification_settings')
export class UserNotificationSetting extends BaseEntity {
    @PrimaryColumn({ name: 'user_id', type: 'bigint' })
    userId!: number;

    @Column({ name: 'email_enabled', type: 'tinyint', default: 1 })
    emailEnabled!: boolean;

    @Column({ name: 'push_enabled', type: 'tinyint', default: 0 })
    pushEnabled!: boolean;

    @Column({ name: 'notify_expiring_subscription', type: 'tinyint', default: 1 })
    notifyExpiringSubscription!: boolean;

    @OneToOne(() => require('../users/user.entity.js').User, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'user_id' })
    user!: any;
}
