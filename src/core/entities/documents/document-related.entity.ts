import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_related')
export class DocumentRelated extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'relation_type', type: 'enum', enum: ['NC', 'ND', 'ANULACION', 'REFERENCIA'] })
    relationType!: 'NC' | 'ND' | 'ANULACION' | 'REFERENCIA';

    @Column({ length: 255, nullable: true })
    reason?: string;

    @Column({ name: 'reason_code', length: 10, nullable: true })
    reasonCode?: string;

    @ManyToOne('documents', (doc: any) => doc.relations, { onDelete: 'CASCADE' })
    document!: any;

    @ManyToOne('documents', (doc: any) => doc.id, { onDelete: 'CASCADE' })
    relatedDocument!: any;

    @ManyToOne('credit_notes_reasons', (cnr: any) => cnr, { onDelete: 'NO ACTION' })
    creditNoteReason?: any;
}
