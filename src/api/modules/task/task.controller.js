import catchAsync from '../../../utils/catchAsync.js';
import { ok, created, noContent } from '../../../utils/ApiResponse.js';
import * as service from './task.service.js';

export const createTask = catchAsync(async (req, res) => {
  const task = await service.create(req.body, req.user.id);
  return created(res, task);
});

export const getTasks = catchAsync(async (req, res) => {
  const data = await service.list(req.query);
  return ok(res, data.rows, { total:data.count, page:data.page, limit:data.limit, pages:data.pages });
});

export const getTask = catchAsync(async (req, res) => {
  const task = await service.getById(req.params.id);
  if (!task) return res.status(404).json({ success:false, message:'Not found' });
  return ok(res, task);
});

export const updateTask = catchAsync(async (req, res) => {
  const task = await service.update(req.params.id, req.body);
  return ok(res, task);
});

export const deleteTask = catchAsync(async (req, res) => {
  await service.remove(req.params.id);
  return noContent(res);
});

export const patchStatus = catchAsync(async (req, res) => {
  const task = await service.updateOnlyStatus(req.params.id, req.body.status);
  return ok(res, task);
});

export const stats = catchAsync(async (req, res) => {
  const s = await service.stats();
  return ok(res, s);
});

export const search = catchAsync(async (req, res) => {
  const data = await service.list({ ...req.query, search: req.query.q });
  return ok(res, data.rows, { total:data.count, page:data.page, limit:data.limit, pages:data.pages });
});
