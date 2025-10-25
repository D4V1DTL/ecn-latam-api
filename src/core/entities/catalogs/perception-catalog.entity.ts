import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('perception_catalog')
export class PerceptionCatalog extends BaseEntity {
    @PrimaryColumn({ length: 10 })
    code!: string;

    @Column({ length: 255 })
    description!: string;

    @Column({ type: 'tinyint', default: 1 })
    active!: boolean;
}
