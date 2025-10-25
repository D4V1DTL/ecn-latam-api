import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('detraction_rules')
export class DetractionRule extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 10 })
    code!: string;

    @Column({ length: 255, nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 6, scale: 2 })
    rate!: number;

    @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
    threshold!: number;

    @Column({ type: 'tinyint', default: 1 })
    active!: boolean;
}
