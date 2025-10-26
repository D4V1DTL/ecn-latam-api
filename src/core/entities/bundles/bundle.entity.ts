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

@Entity('bundles')
export class Bundle extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 150 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;

    @Column({ name: 'is_active', type: 'tinyint', default: 1 })
    isActive!: boolean;

    @ManyToOne(() => require('../users/user.entity.js').User, { eager: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'created_by' })
    createdBy!: any;

    @OneToMany(() => require('./bundleItem.entity.js').BundleItem, (item: any) => item.bundle)
    items!: any[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
