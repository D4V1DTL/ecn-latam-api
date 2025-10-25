import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_audit_log')
export class DocumentAuditLog extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'user_id', type: 'bigint', nullable: true })
    userId?: number;

    @Column({ length: 100 })
    action!: string;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToOne('documents', (doc: any) => doc, { onDelete: 'CASCADE' })
    document!: any;
}
