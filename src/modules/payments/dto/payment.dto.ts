import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
    IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentItemDto {
    @IsEnum(['plan', 'bundle', 'course', 'event'])
    itemType: 'plan' | 'bundle' | 'course' | 'event';

    @IsNumber()
    itemId: number;

    @IsNumber()
    unitPrice: number;

    @IsOptional()
    @IsNumber()
    quantity?: number;
}

export class CreatePaymentDto {
    @IsNumber()
    payerId: number;

    @IsOptional()
    @IsNumber()
    subscriptionId?: number;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    paymentMethod?: string;

    @IsOptional()
    @IsString()
    transactionRef?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePaymentItemDto)
    items: CreatePaymentItemDto[];
}
