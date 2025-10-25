import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipping_guides')
export class ShippingGuide extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'guide_number', length: 20 })
    guideNumber!: string;

    @Column({ name: 'guide_type', type: 'enum', enum: ['09', '31'] })
    guideType!: '09' | '31';

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToOne('documents', (doc: any) => doc.shippingGuides, { onDelete: 'CASCADE' })
    document!: any;
}
