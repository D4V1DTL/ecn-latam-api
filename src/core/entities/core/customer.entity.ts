import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('customers')
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        type: 'enum',
        enum: ['1', '6', '0'], // 1=DNI,6=RUC,0=VARIOS
    })
    documentType!: '1' | '6' | '0';

    @Column({ name: 'document_number', length: 20 })
    documentNumber!: string;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255, nullable: true })
    address?: string;

    @Column({ length: 255, nullable: true })
    email?: string;

    @Column({ length: 50, nullable: true })
    phone?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    // Relaciones
    @OneToMany('documents', (doc: any) => doc.customer)
    documents!: any[];

    @OneToMany('anticipations', (antic: any) => antic.customer)
    anticipations!: any[];
}
