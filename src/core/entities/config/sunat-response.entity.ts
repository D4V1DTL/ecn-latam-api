import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sunat_responses')
export class SunatResponse extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'sent_zip', type: 'longblob', nullable: true })
    sentZip?: Buffer;

    @Column({ name: 'sent_xml', type: 'mediumtext', nullable: true })
    sentXml?: string;

    @Column({ name: 'response_zip', type: 'longblob', nullable: true })
    responseZip?: Buffer;

    @Column({ name: 'response_xml', type: 'mediumtext', nullable: true })
    responseXml?: string;

    @Column({ name: 'response_code', length: 50, nullable: true })
    responseCode?: string;

    @Column({ name: 'response_message', type: 'text', nullable: true })
    responseMessage?: string;

    @Column({ name: 'cdr_filename', length: 255, nullable: true })
    cdrFilename?: string;

    @Column({
        type: 'enum',
        enum: ['OK', 'ERROR', 'PENDING'],
        default: 'PENDING',
    })
    status!: 'OK' | 'ERROR' | 'PENDING';

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToOne('documents', (doc: any) => doc, { onDelete: 'SET NULL' })
    document?: any;
}
