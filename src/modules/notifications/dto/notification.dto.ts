import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    message?: string;

    @IsEnum(['system', 'subscription', 'referral', 'event', 'payment'])
    type: 'system' | 'subscription' | 'referral' | 'event' | 'payment';
}
