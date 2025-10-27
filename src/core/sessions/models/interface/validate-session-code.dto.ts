import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class ValidateSessionCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
