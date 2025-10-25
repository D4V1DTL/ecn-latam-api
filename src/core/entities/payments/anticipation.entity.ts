import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('anticipations')
export class Anticipation extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'anticipation_number', length: 20, nullable: true })
    anticipationNumber?: string;

    @Column({ name: 'issue_date', type: 'date' })
    issueDate!: Date;

    @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2 })
    totalAmount!: number;

    @Column({ name: 'balance_amount', type: 'decimal', precision: 15, scale: 2 })
    balanceAmount!: number;

    @Column({ length: 3, default: 'PEN' })
    currency!: string;

    @Column({
        name: 'payment_method',
        type: 'enum',
        enum: ['EFECTIVO', 'TRANSFERENCIA', 'TARJETA', 'OTROS'],
        default: 'EFECTIVO',
    })
    paymentMethod!: 'EFECTIVO' | 'TRANSFERENCIA' | 'TARJETA' | 'OTROS';

    @Column({ type: 'text', nullable: true })
    reference?: string;

    @Column({
        type: 'enum',
        enum: ['ACTIVO', 'APLICADO', 'ANULADO'],
        default: 'ACTIVO',
    })
    status!: 'ACTIVO' | 'APLICADO' | 'ANULADO';

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne('companies', (comp: any) => comp.anticipations, { onDelete: 'CASCADE' })
    company!: any;

    @ManyToOne('customers', (cust: any) => cust.anticipations, { onDelete: 'CASCADE' })
    customer!: any;

    @ManyToOne('documents', (doc: any) => doc, { onDelete: 'SET NULL' })
    document?: any;

    @OneToMany('document_anticipations', (da: any) => da.anticipation)
    documentApplications!: any[];
}
