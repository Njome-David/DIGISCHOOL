import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Admin extends Model {
  declare ID: number;
  declare nom: string;
  declare username: string;
  declare password: string;
  declare actif: number;
  declare typeAdmin: number;
  declare mobile: string;
  declare alanyaID: string;
  declare created_at: Date;
  declare isDelete: number;
}
Admin.init(
  {
    ID: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    nom: DataTypes.STRING(100),
    username: DataTypes.STRING(50),
    password: DataTypes.STRING(255),
    actif: DataTypes.TINYINT,
    typeAdmin: DataTypes.SMALLINT,
    mobile: DataTypes.STRING(15),
    alanyaID: DataTypes.STRING(15),
    created_at: DataTypes.DATE,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Admin' }
);
