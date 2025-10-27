import { IsString, IsOptional, IsNumber, IsBoolean, Min } from 'class-validator';

export class CreatePlanDto {
    @IsString()
    name: string;

    @IsNumber()
    @Min(1)
    durationMonths: number;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsNumber()
    trialDays?: number;
}
