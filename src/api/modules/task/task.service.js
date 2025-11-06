import { Op } from 'sequelize';
import { Task } from './task.model.js';
import { User } from '../user/user.model.js';

export const create = async (payload, userId) => {
  return Task.create({ ...payload, createdById: userId });
};

export const getById = async (id) => {
  return Task.findByPk(id, {
    include: [
      { model: User, as:'assignedTo', attributes:['id','name','email'] },
      { model: User, as:'createdBy', attributes:['id','name','email'] }
    ]
  });
};

export const update = async (id, payload) => {
  await Task.update(payload, { where:{ id } });
  return getById(id);
};

export const remove = async (id) => {
  return Task.destroy({ where:{ id } });
};

export const list = async ({ page=1, limit=10, status, priority, search }) => {
  const where = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (search) where.title = { [Op.iLike]: `%${search}%` };

  const offset = (page - 1) * limit;
  const { rows, count } = await Task.findAndCountAll({
    where,
    offset,
    limit,
    order:[['createdAt','DESC']],
    include: [{ model: User, as:'assignedTo', attributes:['id','name'] }]
  });

  return { rows, count, page, limit, pages: Math.ceil(count/limit) };
};

export const updateOnlyStatus = async (id, status) => {
  await Task.update({ status }, { where:{ id } });
  return getById(id);
};

export const stats = async () => {
  const [pending, inProgress, completed] = await Promise.all([
    Task.count({ where:{ status:'pending' } }),
    Task.count({ where:{ status:'in-progress' } }),
    Task.count({ where:{ status:'completed' } }),
  ]);
  return { pending, inProgress, completed };
};
