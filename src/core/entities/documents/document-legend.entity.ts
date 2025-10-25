import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_legends')
export class DocumentLegend extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 10 })
    code!: string;

    @Column({ length: 500 })
    value!: string;

    @ManyToOne('documents', (doc: any) => doc.legends, { onDelete: 'CASCADE' })
    document!: any;
}
