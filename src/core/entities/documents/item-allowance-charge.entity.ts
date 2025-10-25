import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item_allowances_charges')
export class ItemAllowanceCharge extends BaseEntity {
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

    @ManyToOne('document_items', (item: any) => item.itemAllowanceCharges, { onDelete: 'CASCADE' })
    documentItem!: any;
}
