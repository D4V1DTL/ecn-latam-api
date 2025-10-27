import {
    Controller,
    Get,
    Post,
    Body,
    UseInterceptors,
    Req,
} from '@nestjs/common';
import { PurchaseEntitlementsService } from './purchase-entitlements.service.js';
import { CreatePurchaseEntitlementDto } from './dto/purchase-entitlement.dto.js';
import { CookieInterceptor } from '../../core/sessions/cookie.interceptor.js';
import { ICustomInteceptRequest } from '../../core/sessions/models/interface/custom-intercept-request.interface.js';

@Controller('entitlements')
@UseInterceptors(CookieInterceptor)
export class PurchaseEntitlementsController {
    constructor(private readonly service: PurchaseEntitlementsService) { }

    @Post()
    async create(@Body() body: CreatePurchaseEntitlementDto) {
        return this.service.create(body);
    }

    @Get('me')
    async getMyEntitlements(@Req() req: ICustomInteceptRequest) {
        return this.service.getUserEntitlements(req.TOKEM_REQUEST_KEY.user_id);
    }
}
