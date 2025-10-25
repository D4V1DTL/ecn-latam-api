import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_tax')
export class DocumentTax extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'tax_type', length: 10 })
    taxType!: string; // 1000=IGV, 2000=ISC, 9999=OTROS

    @Column({ name: 'base_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    baseAmount!: number;

    @Column({ name: 'tax_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    taxAmount!: number;

    @Column({ name: 'percentage', type: 'decimal', precision: 5, scale: 2, default: 0 })
    percentage!: number;

    @ManyToOne('documents', (doc: any) => doc.taxes, { onDelete: 'CASCADE' })
    document!: any;

    @ManyToOne('tax_catalog', (tc: any) => tc, { onDelete: 'RESTRICT' })
    taxCatalog?: any;
}
