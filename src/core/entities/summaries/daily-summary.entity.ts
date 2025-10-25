import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity('daily_summaries')
@Unique(['company', 'summaryDate', 'identifier'])
export class DailySummary extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'summary_date', type: 'date' })
    summaryDate!: Date;

    @Column({ length: 30 })
    identifier!: string;

    @Column({ name: 'sunat_ticket', length: 50, nullable: true })
    sunatTicket?: string;

    @Column({
        type: 'enum',
        enum: ['GENERADO', 'ENVIADO', 'ACEPTADO', 'OBSERVADO', 'RECHAZADO'],
        default: 'GENERADO',
    })
    status!: 'GENERADO' | 'ENVIADO' | 'ACEPTADO' | 'OBSERVADO' | 'RECHAZADO';

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToOne('companies', (comp: any) => comp.dailySummaries, { onDelete: 'CASCADE' })
    company!: any;

    @OneToMany('daily_summary_items', (item: any) => item.dailySummary)
    items!: any[];
}
