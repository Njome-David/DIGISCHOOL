import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Mode extends Model {
  declare idMode: number;
  declare libelle: string;
  declare information: string;
  declare actif: number;
  declare idFondateur: number;
  declare created_at: Date;
}
Mode.init(
  {
    idMode: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(100),
    information: DataTypes.TEXT,
    actif: DataTypes.TINYINT,
    idFondateur: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
  },
  { ...def, tableName: 'Mode' }
);
