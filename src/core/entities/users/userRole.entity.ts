import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Unique,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('user_roles')
@Unique(['user', 'role'])
export class UserRole extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(() => require('../users/user.entity.js').User, (user: any) => user.userRoles, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'user_id' })
    user!: any;

    @ManyToOne(() => require('./role.entity.js').Role, (role: any) => role.userRoles, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'role_id' })
    role!: any;
}
