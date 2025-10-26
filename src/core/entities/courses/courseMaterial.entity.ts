import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('course_materials')
export class CourseMaterial extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('./courseClass.entity.js').CourseClass, (cls: any) => cls.materials, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'class_id' })
    class!: any;

    @Column({ length: 255 })
    title!: string;

    @Column({ type: 'enum', enum: ['pdf', 'link', 'other'], default: 'link' })
    type!: 'pdf' | 'link' | 'other';

    @Column({ length: 255 })
    url!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
