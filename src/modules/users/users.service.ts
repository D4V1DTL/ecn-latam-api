import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../core/entities/users/user.entity.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
    ) { }

    async getProfile(userId: number) {
        const user = await this.usersRepo.findOne({
            where: { id: userId },
            relations: ['roles'],
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async updateProfile(userId: number, data: UpdateUserDto) {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        Object.assign(user, data);
        await this.usersRepo.save(user);
        return { message: 'Profile updated successfully' };
    }

    async updateAvatar(userId: number, file: Express.Multer.File) {
        if (!file) throw new BadRequestException('No file uploaded');
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        // Asegurar carpeta de uploads
        const uploadDir = join(process.cwd(), 'uploads', 'avatars');
        if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

        user.avatar = `/uploads/avatars/${file.filename}`;
        await this.usersRepo.save(user);

        return { message: 'Avatar updated successfully', avatar: user.avatar };
    }
}
