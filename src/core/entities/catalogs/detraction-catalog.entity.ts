import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('detraction_catalog')
export class DetractionCatalog extends BaseEntity {
    @PrimaryColumn({ type: "varchar", length: 10 })
    code!: string;

    @Column({ type: "varchar", length: 255 })
    description!: string;

    @Column({ type: 'tinyint', default: 1 })
    active!: boolean;
}
