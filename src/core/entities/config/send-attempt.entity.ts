import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('send_attempts')
export class SendAttempt extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'attempt_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    attemptAt!: Date;

    @Column({ length: 20, nullable: true })
    transport?: string;

    @Column({ name: 'request_xml', type: 'mediumtext', nullable: true })
    requestXml?: string;

    @Column({ name: 'response_xml', type: 'mediumtext', nullable: true })
    responseXml?: string;

    @Column({ name: 'http_status', type: 'int', nullable: true })
    httpStatus?: number;

    @Column({ name: 'error_message', type: 'text', nullable: true })
    errorMessage?: string;

    @ManyToOne('documents', (doc: any) => doc, { onDelete: 'CASCADE' })
    document!: any;
}
