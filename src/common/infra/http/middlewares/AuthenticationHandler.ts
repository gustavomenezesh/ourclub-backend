import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@common/errors/AppError';
import Types from '@common/container/types';
import AuthConfig from '@config/SecurityConfig';
import Container from '@common/container';

import IUserRepository from '@modules/user/repositories/IUserRepository';

interface IDecodedParams {
  iat: number;
  exp: number;
  userId: string;
}

const publicKey = AuthConfig.jwt.key;

const AuthMiddleware = {

  required: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const UserRepository = Container.get<IUserRepository>(Types.UserRepository);

    if (!AuthConfig.active) {
      req.auth = { user: 0 };
      return next();
    }

    if (!req.headers.authorization) {
      throw new AppError('Missing authorization header', 401);
    }

    const authHeader = req.headers.authorization;
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new AppError('Authentication method not supported', 401);
    }

    try {
      const decoded = <IDecodedParams><unknown>verify(token, publicKey);
      const user = await UserRepository.find({ id: decoded.userId });
      req.auth = { user: user ? user.id : 0 };
      return next();
    } catch (err) {
      throw new AppError('Token is incorrect', 401);
    }
  },

  optional: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const UserRepository = Container.get<IUserRepository>(Types.UserRepository);

    if (!AuthConfig.active) {
      req.auth = { user: 0 };
      return next();
    }

    if (!req.headers.authorization) {
      req.auth = { user: 0 };
      return next();
    }

    const authHeader = req.headers.authorization;
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      req.auth = { user: 0 };
      return next();
    }

    try {
      const decoded = <IDecodedParams><unknown>verify(token, publicKey);
      const user = await UserRepository.find({ id: decoded.userId });
      req.auth = { user: user ? user.id : 0 };
      return next();
    } catch (err) {
      req.auth = { user: 0 };
      return next();
    }
  },

  admin: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const UserRepository = Container.get<IUserRepository>(Types.UserRepository);

    if (!AuthConfig.active) {
      req.auth = { user: 0 };
      return next();
    }

    if (!req.headers.authorization) {
      throw new AppError('Missing authorization header', 401);
    }

    const authHeader = req.headers.authorization;
    const [type, token] = authHeader.split(' ');

    if (type === 'Basic') {
      if (token === AuthConfig.adminToken) {
        req.auth = { user: -1 };
        return next();
      }
    }

    try {
      const decoded = <IDecodedParams><unknown>verify(token, publicKey);
      const user = await UserRepository.find({ id: decoded.userId });
      req.auth = { user: user ? user.id : 0 };
      return next();
    } catch (err) {
      throw new AppError('Token is incorrect', 401);
    }
  },
};

export default AuthMiddleware;
