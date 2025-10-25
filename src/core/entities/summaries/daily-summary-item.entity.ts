import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('daily_summary_items')
export class DailySummaryItem extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        type: 'enum',
        enum: ['INCLUIR', 'MODIFICAR', 'ANULAR'],
        default: 'INCLUIR',
    })
    operation!: 'INCLUIR' | 'MODIFICAR' | 'ANULAR';

    @ManyToOne('daily_summaries', (summary: any) => summary.items, { onDelete: 'CASCADE' })
    dailySummary!: any;

    @ManyToOne('documents', (doc: any) => doc, { onDelete: 'CASCADE' })
    document!: any;
}
