import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_allowances_charges')
export class DocumentAllowanceCharge extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'is_charge', type: 'boolean', default: false })
    isCharge!: boolean; // FALSE=descuento, TRUE=cargo

    @Column({ length: 255, nullable: true })
    reason?: string;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount!: number;

    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
    factor?: number;

    @Column({ name: 'affects_taxable', type: 'boolean', default: true })
    affectsTaxable!: boolean;

    @ManyToOne('documents', (doc: any) => doc.documentAllowanceCharges, { onDelete: 'CASCADE' })
    document!: any;
}
