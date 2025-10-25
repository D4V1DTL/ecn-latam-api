import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_files')
export class DocumentFile extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'xml_path', length: 255, nullable: true })
    xmlPath?: string;

    @Column({ name: 'zip_path', length: 255, nullable: true })
    zipPath?: string;

    @Column({ name: 'cdr_path', length: 255, nullable: true })
    cdrPath?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToOne('documents', (doc: any) => doc.files, { onDelete: 'CASCADE' })
    document!: any;
}
