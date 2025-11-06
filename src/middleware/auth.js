import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../api/modules/user/user.model.js';

export const auth = (roles = []) => async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ success:false, message:'Unauthorized' });

    const payload = jwt.verify(token, env.jwt.secret);
    const user = await User.findByPk(payload.sub);
    if (!user) return res.status(401).json({ success:false, message:'Invalid token' });

    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ success:false, message:'Forbidden' });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (e) {
    return res.status(401).json({ success:false, message:'Unauthorized' });
  }
};
