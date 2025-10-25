import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('credit_notes_reasons')
export class CreditNoteReason extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 10 })
    code!: string;

    @Column({ length: 255 })
    description!: string;

    @Column({ type: 'tinyint', default: 1 })
    active!: boolean;
}
