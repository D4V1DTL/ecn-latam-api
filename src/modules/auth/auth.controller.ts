import {
    Body,
    Controller,
    Post,
    Put,
    BadRequestException,
    Res,
    UsePipes,
    ValidationPipe,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import {
    LoginDto,
    RegisterDto,
    ChangePasswordDto,
    RecoverPasswordDto
} from './dto/auth.dto.js';
import { Response } from 'express';
import { CookieInterceptor } from '../../core/sessions/cookie.interceptor.js';
import { ICustomInteceptRequest } from '../../core/sessions/models/interface/custom-intercept-request.interface.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Endpoint para iniciar sesión
    @Post('login')
    async login(@Body() body: LoginDto, @Res() res: Response) {
        const { email, password } = body;
        await this.authService.login(res, email, password);
    }

    // Endpoint para registrarse
    @Post('register')
    async register(@Body() body: RegisterDto) {
        const { email, password, name } = body;
        return this.authService.register(email, password, name);
    }

    // Endpoint para cambiar contraseña
    @Put('change-password')
    @UseInterceptors(CookieInterceptor)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async changePassword(
        @Body() body: ChangePasswordDto,
        @Req() req: ICustomInteceptRequest,
    ) {
        if (!req.TOKEM_REQUEST_KEY.user_id) {
            throw new BadRequestException('Invalid session');
        }
        const { oldPassword, newPassword } = body;
        return this.authService.changePassword(
            req.TOKEM_REQUEST_KEY.user_id,
            oldPassword,
            newPassword,
        );
    }

    // Endpoint para recuperar contraseña
    @Post('recover-password')
    async recoverPassword(@Body() body: RecoverPasswordDto) {
        const { email } = body;
        return this.authService.recoverPassword(email);
    }

    @Put('reset-password')
    @UseInterceptors(CookieInterceptor)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async resetPassword(@Body() body, @Req() req: ICustomInteceptRequest, @Res() res) {
        const { newPassword } = body;
        return this.authService.resetPassword(res, req.TOKEM_REQUEST_KEY.session_id, newPassword);
    }
}
