import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('currencies')
export class Currency extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 3, unique: true })
    code!: string;

    @Column({ length: 50, nullable: true })
    name?: string;

    @Column({ length: 5, nullable: true })
    symbol?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
