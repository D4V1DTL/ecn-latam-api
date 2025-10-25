import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('taxes')
export class Tax extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 10 })
    code!: string;

    @Column({ length: 100 })
    name!: string;

    @Column({ type: 'decimal', precision: 6, scale: 2 })
    rate!: number;

    @Column({ name: 'applies_to', type: 'enum', enum: ['line', 'document'], default: 'line' })
    appliesTo!: 'line' | 'document';

    @Column({ type: 'tinyint', default: 1 })
    active!: boolean;
}
