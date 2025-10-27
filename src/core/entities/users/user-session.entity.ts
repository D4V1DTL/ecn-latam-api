import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from 'typeorm';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

@Entity('user_sessions')
export class UserSession extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id;

    @ManyToOne(() => require('./user.entity.js').User, (user: any) => user.userSession, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'user_id' })
    user;

    @Column({ name: 'refresh_token', type: 'varchar', length: 255 })
    refreshToken;

    @Column({ name: 'user_agent', type: 'varchar', length: 255, nullable: true })
    userAgent;

    @Column({ name: 'ip_address', type: 'varchar', length: 100, nullable: true })
    ipAddress;

    @Column({ name: 'expires_at', type: 'datetime', nullable: true })
    expiresAt;

    @CreateDateColumn({ name: 'created_at' })
    createdAt;
}
