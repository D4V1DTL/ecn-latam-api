import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class RecoverPasswordDto {
  @IsEmail()
  email: string;
}

export class RecoverChangePasswordDto {
  @IsEmail()
  email: string;
}

export class SessionCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  method: 'whatsapp' | 'email';
}
