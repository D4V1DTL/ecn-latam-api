import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payments')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'paid_amount', type: 'decimal', precision: 18, scale: 2 })
    paidAmount!: number;

    @Column({ name: 'paid_date', type: 'date' })
    paidDate!: Date;

    @Column({ name: 'payment_method', length: 50, nullable: true })
    paymentMethod?: string;

    @Column({ length: 255, nullable: true })
    reference?: string;

    @Column({ name: 'extra', type: 'json', nullable: true })
    extra?: Record<string, any>;

    @ManyToOne('documents', (doc: any) => doc.payments, { onDelete: 'CASCADE' })
    document!: any;

    @ManyToOne('installments', (inst: any) => inst.payments, { onDelete: 'SET NULL' })
    installment?: any;
}
