import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('void_communication_items')
export class VoidCommunicationItem extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 255, nullable: true })
    reason?: string;

    @ManyToOne('void_communications', (vc: any) => vc.items, { onDelete: 'CASCADE' })
    voidCommunication!: any;

    @ManyToOne('documents', (doc: any) => doc, { onDelete: 'CASCADE' })
    document!: any;
}
