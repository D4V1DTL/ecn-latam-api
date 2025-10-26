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

@Entity('referral_slots')
export class ReferralSlot extends BaseEntity {
    @PrimaryColumn({ name: 'user_id', type: 'bigint' })
    userId!: number;

    @Column({ name: 'max_slots', type: 'int' })
    maxSlots!: number;

    @OneToOne(() => require('../users/user.entity.js').User, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: any;
}
