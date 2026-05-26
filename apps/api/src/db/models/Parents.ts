import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Parents extends Model {
  declare idParent: number;
  declare idPers: number;
  declare matricule: number;
  declare idAdmin: number;
  declare created_at: Date;
  declare isDelete: number;
}
Parents.init(
  {
    idParent: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    idPers: DataTypes.INTEGER.UNSIGNED,
    matricule: DataTypes.INTEGER.UNSIGNED,
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Parents' }
);
