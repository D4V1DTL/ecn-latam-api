import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ length: 50, unique: true })
    name!: string; // admin, teacher, student

    @Column({ length: 255, nullable: true })
    description?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @OneToMany(() => require('./userRole.entity.js').UserRole, (ur: any) => ur.role)
    userRoles!: any[];
}
