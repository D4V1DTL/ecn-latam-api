import { IsNumber, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    planId: number;

    @IsOptional()
    @IsBoolean()
    autoRenew?: boolean;
}

export class UpdateSubscriptionDto {
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsBoolean()
    autoRenew?: boolean;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}
