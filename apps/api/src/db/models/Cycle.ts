import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Cycle extends Model {
  declare idCycle: number;
  declare libelle: string;
  declare description: string;
  declare idAdmin: number;
  declare created: Date;
  declare isDelete: number;
}
Cycle.init(
  {
    idCycle: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(255),
    description: DataTypes.TEXT,
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created: DataTypes.DATE,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Cycle' }
);
