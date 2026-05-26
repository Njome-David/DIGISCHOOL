import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Salle extends Model {
  declare idSalle: number;
  declare libelle: string;
  declare position: string;
  declare surface: string;
  declare idClasse: number;
  declare actif: number;
  declare idAdmin: number;
  declare created_at: Date;
}
Salle.init(
  {
    idSalle: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(30),
    position: DataTypes.STRING(100),
    surface: DataTypes.STRING(30),
    idClasse: DataTypes.INTEGER.UNSIGNED,
    actif: DataTypes.TINYINT,
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
  },
  { ...def, tableName: 'Salle' }
);
