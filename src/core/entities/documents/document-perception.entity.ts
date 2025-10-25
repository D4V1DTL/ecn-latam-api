import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_perception')
export class DocumentPerception extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'percentage', type: 'decimal', precision: 5, scale: 2, nullable: true })
    percentage?: number;

    @Column({ name: 'amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
    amount?: number;

    @Column({ name: 'base_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
    baseAmount?: number;

    @ManyToOne('documents', (doc: any) => doc.perceptions, { onDelete: 'CASCADE' })
    document!: any;

    @ManyToOne('perception_catalog', (pc: any) => pc, { onDelete: 'RESTRICT' })
    perceptionCatalog?: any;
}
