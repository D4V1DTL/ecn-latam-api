import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity('establishments')
@Unique(['company', 'code'])
export class Establishment extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 10 })
    code!: string;

    @Column({ length: 255 })
    address!: string;

    @Column({ length: 6, nullable: true })
    ubigeo?: string;

    @Column({ length: 100, nullable: true })
    department?: string;

    @Column({ length: 100, nullable: true })
    province?: string;

    @Column({ length: 100, nullable: true })
    district?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    // Relaciones
    @ManyToOne('companies', (company: any) => company.establishments, {
        onDelete: 'CASCADE',
    })
    company!: any;
}
