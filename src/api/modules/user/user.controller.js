import catchAsync from '../../../utils/catchAsync.js';
import { ok } from '../../../utils/ApiResponse.js';
import { verifyAndRotateRefresh } from '../../../utils/token.js';
import * as userService from './user.service.js';
import { created } from '../../../utils/ApiResponse.js';
import { RefreshToken } from './user.token.model.js';


export const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  return created(res, { id:user.id, name:user.name, email:user.email, role:user.role });
});

export const login = catchAsync(async (req, res) => {
  const data = await userService.loginUser(req.body);
  return ok(res, data);
});




export const refresh = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  const tokens = await verifyAndRotateRefresh(refreshToken);
  return ok(res, tokens);
});


export const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  await RefreshToken.update({ revoked: true }, { where: { token: refreshToken } });
  return res.status(204).send();
});