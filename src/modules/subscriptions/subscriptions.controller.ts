import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    ParseIntPipe,
    UseInterceptors,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service.js';
import { CookieInterceptor } from '../../core/sessions/cookie.interceptor.js';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto/subscription.dto.js';
import { ICustomInteceptRequest } from '../../core/sessions/models/interface/custom-intercept-request.interface.js';

@Controller('subscriptions')
@UseInterceptors(CookieInterceptor)
export class SubscriptionsController {
    constructor(private readonly subsService: SubscriptionsService) { }

    @Get('user')
    async getUserSubscriptions(@Body() req: ICustomInteceptRequest) {
        return this.subsService.getUserSubscriptions(req.TOKEM_REQUEST_KEY.user_id);
    }

    @Post()
    async create(@Body() body: CreateSubscriptionDto) {
        return this.subsService.createSubscription(body);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateSubscriptionDto,
    ) {
        return this.subsService.updateSubscription(id, body);
    }

    @Post('deactivate-expired')
    async deactivateExpired() {
        return this.subsService.deactivateExpired();
    }
}
