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

@Entity('referral_slots')
@Unique(['user'])
export class ReferralSlot extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('../users/user.entity.js').User, (user: any) => user.referralSlots, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'user_id' })
    user!: any;

    @Column({ name: 'max_slots', type: 'int', nullable: false })
    maxSlots!: number;
}
