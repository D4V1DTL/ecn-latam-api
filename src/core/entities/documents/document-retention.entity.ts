import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_retention')
export class DocumentRetention extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'retention_percentage', type: 'decimal', precision: 5, scale: 2 })
    retentionPercentage!: number;

    @Column({ name: 'retained_amount', type: 'decimal', precision: 15, scale: 2 })
    retainedAmount!: number;

    @Column({ name: 'payment_amount', type: 'decimal', precision: 15, scale: 2 })
    paymentAmount!: number;

    @ManyToOne('documents', (doc: any) => doc.retentions, { onDelete: 'CASCADE' })
    document!: any;
}
