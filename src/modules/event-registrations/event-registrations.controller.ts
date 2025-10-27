import { Controller, Post, Get, Param, Req, UseInterceptors } from '@nestjs/common';
import { EventRegistrationsService } from './event-registrations.service.js';
import { CookieInterceptor } from '../../core/sessions/cookie.interceptor.js';
import { ICustomInteceptRequest } from '../../core/sessions/models/interface/custom-intercept-request.interface.js';

@Controller('events')
@UseInterceptors(CookieInterceptor)
export class EventRegistrationsController {
    constructor(private readonly regService: EventRegistrationsService) { }

    @Post(':id/register')
    async register(@Param('id') eventId: number, @Req() req: ICustomInteceptRequest) {
        const userId = req.TOKEM_REQUEST_KEY.user_id;
        return this.regService.registerUser(eventId, userId);
    }

    @Get('my/registrations')
    async getMyRegistrations(@Req() req: ICustomInteceptRequest) {
        const userId = req.TOKEM_REQUEST_KEY.user_id;
        return this.regService.getMyRegistrations(userId);
    }
}
