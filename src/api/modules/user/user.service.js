import bcrypt from 'bcryptjs';
import { User } from './user.model.js';
import { generateAuthTokens } from '../../../utils/token.js';

export const createUser = async (payload) => {
  const hash = await bcrypt.hash(payload.password, 10);
  const user = await User.create({ ...payload, password: hash });
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw Object.assign(new Error('Invalid credentials'), { statusCode:401 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Object.assign(new Error('Invalid credentials'), { statusCode:401 });

  const tokens = await generateAuthTokens(user);
  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, ...tokens };
};