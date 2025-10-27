import { Controller, Get, Param, Req, UseInterceptors } from '@nestjs/common';
import { EventsService } from './events.service.js';
import { OptionalCookieInterceptor } from '../../core/sessions/optional-cookie.interceptor.js';
import { ICustomInteceptRequest } from 'src/core/sessions/models/interface/custom-intercept-request.interface.js';

@Controller('events')
@UseInterceptors(OptionalCookieInterceptor)
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    async findAll(@Req() req: ICustomInteceptRequest) {
        const userId = req?.TOKEM_REQUEST_KEY?.user_id ?? null;
        return this.eventsService.findAll(userId);
    }

    @Get(':id')
    async findById(@Param('id') id: number, @Req() req: ICustomInteceptRequest) {
        const userId = req?.TOKEM_REQUEST_KEY?.user_id ?? null;
        return this.eventsService.findById(id, userId);
    }
}
