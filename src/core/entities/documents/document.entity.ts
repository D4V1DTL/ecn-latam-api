import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('documents')
@Index('idx_documents_company_type_date', ['company', 'type', 'issueDate'])
@Index('idx_documents_customer', ['customer'])
export class Document extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'enum', enum: ['01', '03', '07', '08'] })
    type!: '01' | '03' | '07' | '08';

    @Column({ type: 'int' })
    number!: number;

    // Nota: full_number es generado en BD. Puedes mapearlo como read-only si lo necesitas.
    @Column({ name: 'full_number', length: 20, nullable: true, select: false })
    fullNumber?: string;

    @Column({ name: 'issue_date', type: 'date' })
    issueDate!: Date;

    @Column({ name: 'due_date', type: 'date', nullable: true })
    dueDate?: Date;

    @Column({ type: 'enum', enum: ['PEN', 'USD'], default: 'PEN' })
    currency!: 'PEN' | 'USD';

    @Column({ name: 'payment_method', type: 'enum', enum: ['contado', 'credito'], default: 'contado' })
    paymentMethod!: 'contado' | 'credito';

    @Column({ name: 'taxable_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    taxableAmount!: number;

    @Column({ name: 'exonerated_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    exoneratedAmount!: number;

    @Column({ name: 'unaffected_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    unaffectedAmount!: number;

    @Column({ name: 'free_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    freeAmount!: number;

    @Column({ name: 'igv_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    igvAmount!: number;

    @Column({ name: 'isc_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    iscAmount!: number;

    @Column({ name: 'other_taxes_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    otherTaxesAmount!: number;

    @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    totalAmount!: number;

    @Column({
        name: 'sunat_status',
        type: 'enum',
        enum: ['PENDIENTE', 'ENVIADO', 'ACEPTADO', 'RECHAZADO', 'ANULADO'],
        default: 'PENDIENTE',
    })
    sunatStatus!: 'PENDIENTE' | 'ENVIADO' | 'ACEPTADO' | 'RECHAZADO' | 'ANULADO';

    @Column({ name: 'cdr_status', length: 50, nullable: true })
    cdrStatus?: string;

    @Column({ name: 'cdr_observation', type: 'text', nullable: true })
    cdrObservation?: string;

    @Column({ name: 'hash_cpe', length: 200, nullable: true })
    hashCpe?: string;

    @Column({ name: 'exchange_rate', type: 'decimal', precision: 10, scale: 4, default: 1.0 })
    exchangeRate!: number;

    @Column({ name: 'anticipation_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    anticipationAmount!: number;

    @Column({ name: 'has_perception', type: 'boolean', default: false })
    hasPerception!: boolean;

    @Column({ name: 'perception_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    perceptionAmount!: number;

    @Column({ name: 'perception_base', type: 'decimal', precision: 15, scale: 2, default: 0 })
    perceptionBase!: number;

    @Column({ name: 'perception_percentage', type: 'decimal', precision: 5, scale: 2, default: 0 })
    perceptionPercentage!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    // ============================
    // 🔗 RELACIONES
    // ============================

    @ManyToOne('companies', (company: any) => company.documents, { onDelete: 'CASCADE' })
    company!: any;

    @ManyToOne('establishments', (est: any) => est, { onDelete: 'SET NULL' })
    establishment?: any;

    @ManyToOne('customers', (cust: any) => cust.documents, { onDelete: 'CASCADE' })
    customer!: any;

    @ManyToOne('series', (series: any) => series.documents, { onDelete: 'CASCADE' })
    series!: any;

    @OneToMany('document_items', (item: any) => item.document)
    items!: any[];

    @OneToMany('document_tax', (tax: any) => tax.document)
    taxes!: any[];

    @OneToMany('document_legends', (legend: any) => legend.document)
    legends!: any[];

    @OneToMany('document_perception', (dp: any) => dp.document)
    perceptions!: any[];

    @OneToMany('document_related', (rel: any) => rel.document)
    relations!: any[];

    @OneToMany('document_status', (status: any) => status.document)
    statuses!: any[];

    @OneToMany('document_logs', (log: any) => log.document)
    logs!: any[];

    @OneToMany('document_files', (file: any) => file.document)
    files!: any[];

    @OneToMany('document_detraction', (det: any) => det.document)
    detractions!: any[];

    @OneToMany('document_retention', (ret: any) => ret.document)
    retentions!: any[];

    @OneToMany('installments', (inst: any) => inst.document)
    installments!: any[];

    @OneToMany('payments', (pay: any) => pay.document)
    payments!: any[];

    @OneToMany('document_anticipations', (applied: any) => applied.document)
    appliedAnticipations!: any[];

    @OneToMany('shipping_guides', (sg: any) => sg.document)
    shippingGuides!: any[];

    @OneToMany('shipping_details', (sd: any) => sd.document)
    shippingDetails!: any[];

    @OneToMany('document_allowances_charges', (dac: any) => dac.document)
    documentAllowanceCharges!: any[];
}
