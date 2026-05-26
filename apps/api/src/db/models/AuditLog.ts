import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class AuditLog extends Model {
  declare id: number;
  declare userId: number;
  declare userType: string;
  declare role: string;
  declare action: string;
  declare resource: string;
  declare resourceId: string | null;
  declare ip: string | null;
  declare meta: string | null;
}
AuditLog.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    userType: { type: DataTypes.STRING(20), allowNull: false },
    role: { type: DataTypes.STRING(50), allowNull: false },
    action: { type: DataTypes.STRING(100), allowNull: false },
    resource: { type: DataTypes.STRING(100), allowNull: false },
    resourceId: { type: DataTypes.STRING(50), allowNull: true },
    ip: { type: DataTypes.STRING(45), allowNull: true },
    meta: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: 'AuditLogs', timestamps: true }
);
