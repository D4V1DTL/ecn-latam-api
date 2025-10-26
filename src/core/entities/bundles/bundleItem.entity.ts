import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('bundle_items')
@Unique(['bundle', 'itemType', 'school', 'course'])
export class BundleItem extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('./bundle.entity.js').Bundle, (bundle: any) => bundle.items, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'bundle_id' })
    bundle!: any;

    @Column({ name: 'item_type', type: 'enum', enum: ['school', 'course'] })
    itemType!: 'school' | 'course';

    @ManyToOne(() => require('../courses/school.entity.js').School, { eager: true, onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'school_id' })
    school?: any;

    @ManyToOne(() => require('../courses/course.entity.js').Course, { eager: true, onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'course_id' })
    course?: any;
}
