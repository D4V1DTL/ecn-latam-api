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

@Entity('referrals')
@Unique(['referrer', 'referred'])
export class Referral extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('../users/user.entity.js').User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'referrer_id' })
    referrer!: any;

    @ManyToOne(() => require('../users/user.entity.js').User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'referred_id' })
    referred!: any;

    @Column({ type: 'tinyint', default: 1 })
    active!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @Column({ name: 'deactivated_at', type: 'timestamp', nullable: true })
    deactivatedAt?: Date;
}
