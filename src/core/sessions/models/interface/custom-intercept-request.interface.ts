import { Request } from 'express';
export interface ICustomInteceptRequest extends Request {
  TOKEM_REQUEST_KEY: {
    session_id: number;
    user_id: number;
    iat: number;
    exp: number;
  };
}
