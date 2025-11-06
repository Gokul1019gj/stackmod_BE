import { signToken, verifyToken } from './jwt.js';
import { env } from '../config/env.js';
import { RefreshToken } from '../api/modules/user/user.token.model.js';
import { addDays } from 'date-fns';

/**
 * Generate Access + Refresh tokens and persist refresh in DB
 */
export const generateAuthTokens = async (user) => {
  const accessToken = signToken({ sub: user.id, role: user.role }, env.jwt.expires);
  const refreshToken = signToken({ sub: user.id, type: 'refresh' }, env.jwt.refreshExpires);

  const expiresAt = addDays(new Date(), 7);
  await RefreshToken.create({ userId: user.id, token: refreshToken, expiresAt });

  return { accessToken, refreshToken };
};

/**
 * Verify and rotate refresh token
 */
export const verifyAndRotateRefresh = async (token) => {
  const payload = verifyToken(token);
  if (!payload || payload.type !== 'refresh') throw new Error('Invalid token');

  const stored = await RefreshToken.findOne({ where: { token, revoked: false } });
  if (!stored) throw new Error('Refresh token not found');

  if (new Date(stored.expiresAt) < new Date()) throw new Error('Refresh expired');

  // Revoke old and issue new
  stored.revoked = true;
  await stored.save();

  const userId = payload.sub;
  const newAccess = signToken({ sub: userId }, env.jwt.expires);
  const newRefresh = signToken({ sub: userId, type: 'refresh' }, env.jwt.refreshExpires);

  const expiresAt = addDays(new Date(), 7);
  await RefreshToken.create({ userId, token: newRefresh, expiresAt });

  return { accessToken: newAccess, refreshToken: newRefresh };
};
