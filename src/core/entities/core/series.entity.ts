import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('series')
export class Series extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        type: 'enum',
        enum: ['01', '03', '07', '08', 'RC', 'RA', 'RR', '09', '31'],
    })
    type!:
        | '01'
        | '03'
        | '07'
        | '08'
        | 'RC'
        | 'RA'
        | 'RR'
        | '09'
        | '31';

    @Column({ length: 10 })
    prefix!: string;

    @Column({ name: 'current_number', type: 'int', default: 1 })
    currentNumber!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    // Relaciones
    @ManyToOne('companies', (company: any) => company.series, {
        onDelete: 'CASCADE',
    })
    company!: any;

    @OneToMany('documents', (doc: any) => doc.series)
    documents!: any[];
}
