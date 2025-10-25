import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_detraction')
export class DocumentDetraction extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'percentage', type: 'decimal', precision: 5, scale: 2 })
    percentage!: number;

    @Column({ name: 'detraction_amount', type: 'decimal', precision: 15, scale: 2 })
    detractionAmount!: number;

    @Column({ name: 'account_number', length: 30, nullable: true })
    accountNumber?: string;

    @ManyToOne('documents', (doc: any) => doc.detractions, { onDelete: 'CASCADE' })
    document!: any;

    @ManyToOne('detraction_catalog', (dc: any) => dc, { onDelete: 'RESTRICT' })
    detractionCatalog!: any;
}
