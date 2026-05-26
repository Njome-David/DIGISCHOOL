import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class NatureEpreuve extends Model {
  declare idNature: number;
  declare libelle: string;
  declare description: string | null;
}
NatureEpreuve.init(
  {
    idNature: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(255),
    description: DataTypes.TEXT,
  },
  { ...def, tableName: 'NatureEpreuve' }
);
