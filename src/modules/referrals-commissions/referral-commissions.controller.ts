import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { ReferralCommissionsService } from './referral-commissions.service.js';
import { CookieInterceptor } from '../../core/sessions/cookie.interceptor.js';
import { ICustomInteceptRequest } from '../../core/sessions/models/interface/custom-intercept-request.interface.js';

@Controller('referrals/commissions')
@UseInterceptors(CookieInterceptor)
export class ReferralCommissionsController {
    constructor(private readonly commissionsService: ReferralCommissionsService) { }

    // Obtener todas las comisiones del usuario
    @Get('my')
    async getMyCommissions(@Req() req: ICustomInteceptRequest) {
        const userId = req.TOKEM_REQUEST_KEY.user_id;
        return this.commissionsService.findByUser(userId);
    }

    // Obtener resumen (totales por estado)
    @Get('summary')
    async getSummary(@Req() req: ICustomInteceptRequest) {
        const userId = req.TOKEM_REQUEST_KEY.user_id;
        return this.commissionsService.getSummaryByUser(userId);
    }
}
