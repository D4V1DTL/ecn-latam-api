import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../core/entities/notifications/notification.entity.js';
import { User } from '../../core/entities/users/user.entity.js';
import { CreateNotificationDto } from './dto/notification.dto.js';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationsRepo: Repository<Notification>,

        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) { }

    async create(userId: number, data: CreateNotificationDto) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const notification = this.notificationsRepo.create({ ...data, user });
        await this.notificationsRepo.save(notification);
        return { message: 'Notification created', notification };
    }

    async findAllForUser(userId: number) {
        return this.notificationsRepo.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }

    async markAsRead(userId: number, notificationId: number) {
        const notif = await this.notificationsRepo.findOne({
            where: { id: notificationId, user: { id: userId } },
        });
        if (!notif) throw new NotFoundException('Notification not found');

        notif.isRead = true;
        await this.notificationsRepo.save(notif);
        return { message: 'Notification marked as read' };
    }

    async clearAll(userId: number) {
        await this.notificationsRepo.delete({ user: { id: userId } });
        return { message: 'All notifications deleted' };
    }
}
