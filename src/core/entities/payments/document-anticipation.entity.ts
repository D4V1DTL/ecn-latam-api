import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_anticipations')
export class DocumentAnticipation extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'applied_amount', type: 'decimal', precision: 15, scale: 2 })
    appliedAmount!: number;

    @ManyToOne('documents', (doc: any) => doc.appliedAnticipations, { onDelete: 'CASCADE' })
    document!: any;

    @ManyToOne('anticipations', (ant: any) => ant.documentApplications, { onDelete: 'CASCADE' })
    anticipation!: any;
}
