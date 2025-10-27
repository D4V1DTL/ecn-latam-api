import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Req,
    UseInterceptors,
    ParseIntPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { CookieInterceptor } from '../../core/sessions/cookie.interceptor.js';
import { ICustomInteceptRequest } from '../../core/sessions/models/interface/custom-intercept-request.interface.js';
import { CreateNotificationDto } from './dto/notification.dto.js';

@Controller('notifications')
@UseInterceptors(CookieInterceptor)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Get()
    async getAll(@Req() req: ICustomInteceptRequest) {
        return this.notificationsService.findAllForUser(req.TOKEM_REQUEST_KEY.user_id);
    }

    @Post()
    async create(
        @Req() req: ICustomInteceptRequest,
        @Body() body: CreateNotificationDto,
    ) {
        return this.notificationsService.create(req.TOKEM_REQUEST_KEY.user_id, body);
    }

    @Post(':id/read')
    async markAsRead(
        @Req() req: ICustomInteceptRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.notificationsService.markAsRead(req.TOKEM_REQUEST_KEY.user_id, id);
    }

    @Delete()
    async clearAll(@Req() req: ICustomInteceptRequest) {
        return this.notificationsService.clearAll(req.TOKEM_REQUEST_KEY.user_id);
    }
}
