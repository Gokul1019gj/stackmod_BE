import Joi from 'joi';

export const createTask = {
  body: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().allow(''),
    status: Joi.string().valid('pending','in-progress','completed').optional(),
    priority: Joi.string().valid('low','medium','high').optional(),
    dueDate: Joi.date().optional(),
    assignedToId: Joi.number().integer().optional()
  })
};

export const updateTask = {
  body: Joi.object({
    title: Joi.string().trim().optional(),
    description: Joi.string().allow(''),
    status: Joi.string().valid('pending','in-progress','completed').optional(),
    priority: Joi.string().valid('low','medium','high').optional(),
    dueDate: Joi.date().optional(),
    assignedToId: Joi.number().integer().optional()
  })
};

export const updateStatus = {
  params: Joi.object({ id: Joi.number().integer().required() }),
  body: Joi.object({ status: Joi.string().valid('pending','in-progress','completed').required() })
};

export const getTasksQuery = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    status: Joi.string().valid('pending','in-progress','completed').optional(),
    priority: Joi.string().valid('low','medium','high').optional(),
    search: Joi.string().optional()
  })
};
