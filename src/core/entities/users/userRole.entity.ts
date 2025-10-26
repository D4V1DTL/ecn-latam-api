import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('user_roles')
export class UserRole extends BaseEntity {
    @PrimaryColumn({ name: 'user_id', type: 'bigint' })
    userId!: number;

    @PrimaryColumn({ name: 'role_id', type: 'bigint' })
    roleId!: number;

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
