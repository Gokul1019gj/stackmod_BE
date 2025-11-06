import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Sign a JWT token.
 * @param {Object} payload - data to embed
 * @param {String} expiresIn - expiry duration
 */
export const signToken = (payload, expiresIn = env.jwt.expires) => {
  return jwt.sign(payload, env.jwt.secret, { expiresIn });
};


export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwt.secret);
  } catch (err) {
    return null;
  }
};
