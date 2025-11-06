import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/db.js';
import { User } from './user.model.js';

export const RefreshToken = sequelize.define('RefreshToken', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  token: { type: DataTypes.STRING, allowNull: false },
  expiresAt: { type: DataTypes.DATE, allowNull: false },
  revoked: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

RefreshToken.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(RefreshToken, { foreignKey: 'userId' });
