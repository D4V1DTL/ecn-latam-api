import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_status')
@Index('idx_status_document_created', ['document', 'createdAt'])
export class DocumentStatus extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        type: 'enum',
        enum: ['GENERADO', 'FIRMADO', 'ENVIADO', 'ACEPTADO', 'RECHAZADO', 'ANULADO'],
    })
    status!: 'GENERADO' | 'FIRMADO' | 'ENVIADO' | 'ACEPTADO' | 'RECHAZADO' | 'ANULADO';

    @Column({ type: 'text', nullable: true })
    description?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToOne('documents', (doc: any) => doc.statuses, { onDelete: 'CASCADE' })
    document!: any;
}
