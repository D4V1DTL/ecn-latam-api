import { IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePurchaseEntitlementDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    paymentItemId: number;

    @IsEnum(['school', 'course', 'bundle', 'event'])
    targetType: 'school' | 'course' | 'bundle' | 'event';

    @IsNumber()
    targetId: number;

    @IsDateString()
    startDate: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}
