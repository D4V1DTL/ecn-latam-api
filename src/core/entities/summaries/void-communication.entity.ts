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

@Entity('void_communications')
@Unique(['company', 'voidDate', 'identifier'])
export class VoidCommunication extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'void_date', type: 'date' })
    voidDate!: Date;

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

    @ManyToOne('companies', (comp: any) => comp.voidCommunications, { onDelete: 'CASCADE' })
    company!: any;

    @OneToMany('void_communication_items', (item: any) => item.voidCommunication)
    items!: any[];
}
