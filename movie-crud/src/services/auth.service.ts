import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../configs/database';
import { User, UserPublic } from '../../models/user.model';
import { AppError } from '../../middlewares/errorHandler.middleware';

export const loginUser = async (
  username: string,
  password: string
): Promise<{ token: string; user: UserPublic }> => {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  const user = (rows as User[])[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const err: AppError = new Error('Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } as jwt.SignOptions
  );

  const { password: _pwd, ...userPublic } = user;
  return { token, user: userPublic };
};

export const getUserById = async (id: number): Promise<UserPublic | undefined> => {
  const [rows] = await pool.execute(
    'SELECT id, username, role, created_at FROM users WHERE id = ?',
    [id]
  );
  return (rows as UserPublic[])[0];
};
