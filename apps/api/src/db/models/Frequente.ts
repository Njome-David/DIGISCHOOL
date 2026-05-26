import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Frequente extends Model {
  declare idFrequente: number;
  declare idSalle: number;
  declare idAcademi: number;
  declare matricule: number;
  declare commentaire: string;
  declare idAdmin: number;
  declare created_at: Date;
}
Frequente.init(
  {
    idFrequente: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    idSalle: DataTypes.INTEGER.UNSIGNED,
    idAcademi: DataTypes.INTEGER.UNSIGNED,
    matricule: DataTypes.INTEGER.UNSIGNED,
    commentaire: DataTypes.STRING(255),
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
  },
  { ...def, tableName: 'Frequente' }
);
