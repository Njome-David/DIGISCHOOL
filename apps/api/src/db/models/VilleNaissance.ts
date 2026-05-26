import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class VilleNaissance extends Model {
  declare idVille: number;
  declare libelle: string;
  declare actif: number;
}
VilleNaissance.init(
  {
    idVille: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(100),
    actif: DataTypes.TINYINT,
  },
  { ...def, tableName: 'VilleNaissance' }
);
