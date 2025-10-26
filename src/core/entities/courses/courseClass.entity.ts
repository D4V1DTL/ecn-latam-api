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

@Entity('course_classes')
@Index('idx_class_course', ['course'])
export class CourseClass extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('./course.entity.js').Course, (course: any) => course.classes, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'course_id' })
    course!: any;

    @Column({ length: 255 })
    title!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ name: 'video_url', length: 255, nullable: true })
    videoUrl?: string;

    @Column({ name: 'zoom_link', length: 255, nullable: true })
    zoomLink?: string;

    @Column({ name: 'starts_at', type: 'datetime', nullable: true })
    startsAt?: Date;

    @Column({ name: 'duration_minutes', type: 'int', default: 0 })
    durationMinutes!: number;

    @Column({ name: 'order_index', type: 'int', default: 0 })
    orderIndex!: number;

    @OneToMany(() => require('./courseMaterial.entity.js').CourseMaterial, (m: any) => m.class)
    materials!: any[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
