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
    Index,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('courses')
@Index('idx_courses_school', ['school'])
@Index('idx_courses_teacher', ['teacher'])
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('../courses/school.entity.js').School, (school: any) => school.courses, {
        eager: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'school_id' })
    school!: any;

    @ManyToOne(() => require('../users/user.entity.js').User, (user: any) => user.coursesTaught, {
        eager: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'teacher_id' })
    teacher!: any;

    @ManyToOne(() => require('../users/user.entity.js').User, (user: any) => user.coursesTaught, {
        eager: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'created_by' })
    createdBy!: any;

    @Column({ length: 255 })
    title!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
    price!: number;

    @Column({ name: 'is_published', type: 'tinyint', default: 0 })
    isPublished!: boolean;

    @Column({ length: 255, nullable: true })
    thumbnail?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(() => require('./courseClass.entity.js').CourseClass, (cls: any) => cls.course)
    classes!: any[];
}
