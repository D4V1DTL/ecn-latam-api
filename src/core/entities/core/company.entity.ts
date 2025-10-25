import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 20, unique: true })
    ruc!: string;

    @Column({
        type: 'enum',
        enum: ['GENERAL', 'MYPE', 'ESPECIAL', 'NO_DOMICILIADO'],
        default: 'GENERAL',
    })
    taxRegime!: 'GENERAL' | 'MYPE' | 'ESPECIAL' | 'NO_DOMICILIADO';

    @Column({ name: 'legal_name', length: 255 })
    legalName!: string;

    @Column({ name: 'comercial_name', length: 255, nullable: true })
    comercialName?: string;

    @Column({ length: 255, nullable: true })
    address?: string;

    @Column({ name: 'country_code', length: 2, default: 'PE' })
    countryCode!: string;

    @Column({ length: 255, nullable: true })
    email?: string;

    @Column({ length: 50, nullable: true })
    phone?: string;

    @Column({ name: 'logo_url', length: 255, nullable: true })
    logoUrl?: string;

    @Column({ name: 'certificate_path', length: 255, nullable: true })
    certificatePath?: string;

    @Column({ name: 'certificate_password', length: 255, nullable: true })
    certificatePassword?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    // Relaciones
    @OneToMany('establishments', (est: any) => est.company)
    establishments!: any[];

    @OneToMany('series', (series: any) => series.company)
    series!: any[];

    @OneToMany('documents', (doc: any) => doc.company)
    documents!: any[];

    @OneToMany('anticipations', (antic: any) => antic.company)
    anticipations!: any[];

    @OneToMany('daily_summaries', (sum: any) => sum.company)
    dailySummaries!: any[];

    @OneToMany('void_communications', (voidCom: any) => voidCom.company)
    voidCommunications!: any[];
}
