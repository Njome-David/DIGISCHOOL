import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Cours extends Model {
  declare idCours: number;
  declare libelle: string;
  declare note: number;
  declare coefficient: number;
  declare description: string;
  declare idClasse: number;
  declare actif: number;
  declare idAdmin: number;
  declare created_at: Date;
  declare isDelete: number;
}
Cours.init(
  {
    idCours: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(255),
    note: DataTypes.FLOAT,
    coefficient: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    idClasse: DataTypes.INTEGER.UNSIGNED,
    actif: DataTypes.TINYINT,
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Cours' }
);
