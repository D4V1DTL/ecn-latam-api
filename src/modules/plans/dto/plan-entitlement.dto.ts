import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreatePlanEntitlementDto {
    @IsEnum(['platform', 'school', 'course', 'bundle'])
    targetType: 'platform' | 'school' | 'course' | 'bundle';

    @IsOptional()
    @IsNumber()
    targetId?: number;
}
