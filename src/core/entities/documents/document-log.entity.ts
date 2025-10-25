import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_logs')
export class DocumentLog extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 100, nullable: true })
    action?: string;

    @Column({ type: 'text', nullable: true })
    message?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToOne('documents', (doc: any) => doc.logs, { onDelete: 'CASCADE' })
    document!: any;
}
