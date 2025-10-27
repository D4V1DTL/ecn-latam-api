import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 150 })
    name!: string;

    @Column({ length: 150, unique: true })
    email!: string;

    @Column({ length: 255 })
    password!: string;

    @Column({ length: 255, nullable: true })
    avatar?: string;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    isActive!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(() => require('./userRole.entity.js').UserRole, (ur: any) => ur.user)
    userRoles!: any[];

    @OneToMany(() => require('../courses/school.entity.js').School, (school: any) => school.createdBy)
    schoolsCreated!: any[];

    @OneToMany(() => require('../courses/course.entity.js').Course, (course: any) => course.teacher)
    coursesTaught!: any[];

    @OneToMany(() => require('../plans/subscription.entity.js').Subscription, (sub: any) => sub.user)
    subscriptions!: any[];

    @OneToMany(() => require('../payments/payment.entity.js').Payment, (payment: any) => payment.payer)
    payments!: any[];

    @OneToMany(() => require('../referrals/referral.entity.js').Referral, (ref: any) => ref.referrer)
    referralsMade!: any[];

    @OneToMany(() => require('../referrals/referral.entity.js').Referral, (ref: any) => ref.referred)
    referralsReceived!: any[];

    @OneToMany(() => require('../notifications/notification.entity.js').Notification, (n: any) => n.user)
    notifications!: any[];

    @OneToMany(() => require('./user-session.entity.js').UserSession, (userSession: any) => userSession.user)
    userSession!: any[];
}
