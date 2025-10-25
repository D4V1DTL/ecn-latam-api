import { BaseEntity, Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_items')
@Index('idx_items_document', ['document'])
export class DocumentItem extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'item_code', length: 50, nullable: true })
    itemCode?: string;

    @Column({ length: 500 })
    description!: string;

    @Column({ name: 'unit_measure', length: 10, default: 'NIU' })
    unitMeasure!: string;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    quantity!: number;

    @Column({ name: 'unit_value', type: 'decimal', precision: 15, scale: 5 })
    unitValue!: number;

    @Column({ name: 'unit_price', type: 'decimal', precision: 15, scale: 5 })
    unitPrice!: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    discount!: number;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    subtotal!: number;

    @Column({ name: 'igv_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    igvAmount!: number;

    @Column({ name: 'isc_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    iscAmount!: number;

    @Column({ name: 'total', type: 'decimal', precision: 15, scale: 2 })
    total!: number;

    @Column({ name: 'igv_type', type: 'enum', enum: ['10', '20', '30', '40'], default: '10' })
    igvType!: '10' | '20' | '30' | '40';

    @ManyToOne('documents', (doc: any) => doc.items, { onDelete: 'CASCADE' })
    document!: any;

    @OneToMany('item_allowances_charges', (iac: any) => iac.documentItem)
    itemAllowanceCharges!: any[];
}
