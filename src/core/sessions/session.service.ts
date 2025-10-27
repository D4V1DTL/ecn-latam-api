import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { UserSession } from '../entities/users/user-session.entity.js';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSession)
    private readonly sessionRepo: Repository<UserSession>,
  ) { }

  async findSessionById(sessionId) {
    return this.sessionRepo.findOne({ where: { id: sessionId } });
  }

  async findSessionByUserId(userId) {
    return this.sessionRepo.findOne({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteSessionsByUserIdAndDate(userId, date) {
    await this.sessionRepo.delete({
      user: { id: userId },
      createdAt: LessThanOrEqual(date),
    });
  }

  async createSession(data) {
    const session = this.sessionRepo.create(data);
    return this.sessionRepo.save(session);
  }

  async deleteSession(sessionId) {
    await this.sessionRepo.delete({ id: sessionId });
  }

  async deleteAllUserSessions(userId) {
    await this.sessionRepo.delete({ user: { id: userId } });
  }
}
