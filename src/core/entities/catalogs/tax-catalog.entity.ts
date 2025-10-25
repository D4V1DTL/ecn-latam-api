import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tax_catalog')
export class TaxCatalog extends BaseEntity {
    @PrimaryColumn({ length: 10 })
    code!: string;

    @Column({ length: 255 })
    description!: string;

    @Column({ type: 'tinyint', default: 1 })
    active!: boolean;
}
