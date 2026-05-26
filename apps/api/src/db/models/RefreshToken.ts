import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class RefreshToken extends Model {
  declare id: number;
  declare userId: number;
  declare userType: 'admin' | 'personne';
  declare token: string;
  declare expiresAt: Date;
}
RefreshToken.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    userType: { type: DataTypes.ENUM('admin', 'personne'), allowNull: false },
    token: { type: DataTypes.STRING(512), allowNull: false, unique: true },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, tableName: 'RefreshTokens', timestamps: true }
);
