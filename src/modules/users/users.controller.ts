import {
    Controller,
    Get,
    Put,
    Body,
    UseInterceptors,
    Req,
    UploadedFile,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CookieInterceptor } from '../../core/sessions/cookie.interceptor.js';
import { ICustomInteceptRequest } from '../../core/sessions/models/interface/custom-intercept-request.interface.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerAvatarConfig } from '../../core/functions/multer.config.js';

@Controller('users')
@UseInterceptors(CookieInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('profile')
    async getProfile(@Req() req: ICustomInteceptRequest) {
        return this.usersService.getProfile(req.TOKEM_REQUEST_KEY.user_id);
    }

    @Put('profile')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async updateProfile(
        @Body() body: UpdateUserDto,
        @Req() req: ICustomInteceptRequest,
    ) {
        return this.usersService.updateProfile(req.TOKEM_REQUEST_KEY.user_id, body);
    }

    @Put('avatar')
    @UseInterceptors(FileInterceptor('file', multerAvatarConfig))
    async updateAvatar(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: ICustomInteceptRequest,
    ) {
        return this.usersService.updateAvatar(req.TOKEM_REQUEST_KEY.user_id, file);
    }
}
