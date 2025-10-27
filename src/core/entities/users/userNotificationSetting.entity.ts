import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Unique,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('user_notification_settings')
@Unique(['user'])
export class UserNotificationSetting extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('../users/user.entity.js').User, (user: any) => user.notificationSettings, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'user_id' })
    user!: any;

    @Column({ name: 'email_enabled', type: 'tinyint', default: 1 })
    emailEnabled!: boolean;

    @Column({ name: 'push_enabled', type: 'tinyint', default: 0 })
    pushEnabled!: boolean;

    @Column({ name: 'notify_expiring_subscription', type: 'tinyint', default: 1 })
    notifyExpiringSubscription!: boolean;
}
