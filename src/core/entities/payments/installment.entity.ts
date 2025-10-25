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

@Entity('installments')
export class Installment extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'installment_number', type: 'int' })
    installmentNumber!: number;

    @Column({ name: 'due_date', type: 'date' })
    dueDate!: Date;

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount!: number;

    @Column({ name: 'paid_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
    paidAmount!: number;

    @Column({ name: 'payment_date', type: 'date', nullable: true })
    paymentDate?: Date;

    @Column({
        type: 'enum',
        enum: ['PENDIENTE', 'PAGADO', 'VENCIDO', 'ANULADO'],
        default: 'PENDIENTE',
    })
    status!: 'PENDIENTE' | 'PAGADO' | 'VENCIDO' | 'ANULADO';

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne('documents', (doc: any) => doc.installments, { onDelete: 'CASCADE' })
    document!: any;

    @OneToMany('payments', (pay: any) => pay.installment)
    payments!: any[];
}
