import { Controller, Post, Get, Body, Req, UseInterceptors } from '@nestjs/common';
import { ReferralsService } from './referrals.service.js';
import { CookieInterceptor } from '../../core/sessions/cookie.interceptor.js';
import { ICustomInteceptRequest } from '../../core/sessions/models/interface/custom-intercept-request.interface.js';

@Controller('referrals')
@UseInterceptors(CookieInterceptor)
export class ReferralsController {
    constructor(private readonly referralsService: ReferralsService) { }

    // Crear un referido
    @Post()
    async createReferral(@Req() req: ICustomInteceptRequest, @Body('email') email: string) {
        const referrerId = req.TOKEM_REQUEST_KEY.user_id;
        return this.referralsService.create(referrerId, email);
    }

    // Obtener mis referidos
    @Get('my')
    async getMyReferrals(@Req() req: ICustomInteceptRequest) {
        const referrerId = req.TOKEM_REQUEST_KEY.user_id;
        return this.referralsService.getMyReferrals(referrerId);
    }
}
