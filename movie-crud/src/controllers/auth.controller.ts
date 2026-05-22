import { Request, Response, NextFunction } from 'express';
import { loginUser, getUserById } from '../services/auth.service';
import { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.fail('Username and password are required');
      return;
    }

    const result = await loginUser(username as string, password as string);
    res.ok(result);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await getUserById(req.user!.id);

    if (!user) {
      res.fail('User not found', 404);
      return;
    }

    res.ok(user);
  } catch (error) {
    next(error);
  }
};
