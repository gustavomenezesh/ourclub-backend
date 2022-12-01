import Adress from '@modules/adress/infra/typeorm/entities/Adress';

interface IUserLoginResponse {
  accessToken: string;
  accessTokenExpireIn: string;
  refreshToken: string;
  refreshTokenExpireIn: string,
  user: {
    id?: number;
    fullname?: string;
    email?: string;
    phone?: string;
    gender?: string;
    role?: string;
    adress?: Adress[];
  };
}

export default IUserLoginResponse;
