import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/db.js';
import { User } from '../user/user.model.js';

export const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
  title: { type: DataTypes.STRING, allowNull:false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('pending','in-progress','completed'), defaultValue:'pending' },
  priority: { type: DataTypes.ENUM('low','medium','high'), defaultValue:'medium' },
  dueDate: { type: DataTypes.DATE },
}, { timestamps: true });

export const applyAssociations = () => {
  Task.belongsTo(User, { as:'assignedTo', foreignKey: 'assignedToId' });
  Task.belongsTo(User, { as:'createdBy', foreignKey: 'createdById' });
};
