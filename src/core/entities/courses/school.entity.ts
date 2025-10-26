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

@Entity('schools')
export class School extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 150 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ length: 255, nullable: true })
    logo?: string;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    isActive!: boolean;

    @ManyToOne(() => require('../users/user.entity.js').User, (user: any) => user.schoolsCreated, {
        eager: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'created_by' })
    createdBy!: any;

    @OneToMany(() => require('./course.entity.js').Course, (course: any) => course.school)
    courses!: any[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
