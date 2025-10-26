import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('events')
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 255 })
    title!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
    price!: number;

    @Column({ name: 'event_date', type: 'datetime', nullable: true })
    eventDate?: Date;

    @Column({ name: 'zoom_link', length: 255, nullable: true })
    zoomLink?: string;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    isActive!: boolean;

    @ManyToOne(() => require('../users/user.entity.js').User, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'created_by' })
    createdBy!: any;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(() => require('./eventRegistration.entity.js').EventRegistration, (reg: any) => reg.event)
    registrations!: any[];
}
