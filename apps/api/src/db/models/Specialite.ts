import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Specialite extends Model {
  declare idSpecialite: number;
  declare libelle: string;
  declare idAdmin: number;
}
Specialite.init(
  {
    idSpecialite: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(255),
    idAdmin: DataTypes.INTEGER.UNSIGNED,
  },
  { ...def, tableName: 'Specialite' }
);
