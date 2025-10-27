import {
    Controller,
    Get,
    Post,
    Body,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './dto/payment.dto.js';
import { CookieInterceptor } from '../../core/sessions/cookie.interceptor.js';
import { ICustomInteceptRequest } from '../../core/sessions/models/interface/custom-intercept-request.interface.js';

@Controller('payments')
@UseInterceptors(CookieInterceptor)
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    async create(@Body() body: CreatePaymentDto) {
        return this.paymentsService.createPayment(body);
    }

    @Get()
    async findAll() {
        return this.paymentsService.findAll();
    }

    @Get('me')
    async findMyPayments(@Req() req: ICustomInteceptRequest) {
        return this.paymentsService.findByUser(req.TOKEM_REQUEST_KEY.user_id);
    }
}
