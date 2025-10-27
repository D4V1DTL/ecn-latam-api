import { IsString, IsBoolean, IsEnum, IsEmpty } from 'class-validator';
import { SessionType } from '../enum/session-type.enum.js';

export class CreateSessionDto {
  @IsString()
  @IsEmpty()
  user_id: string;

  @IsBoolean()
  @IsEmpty()
  isActive?: boolean;

  @IsString()
  @IsEmpty()
  token: string;

  @IsEnum(SessionType, {
    message: 'type must be either "web" or "recovery-password"',
  })
  @IsEmpty()
  type: SessionType;
}

export class SessionDto {
  @IsString()
  user_id: string;
}
