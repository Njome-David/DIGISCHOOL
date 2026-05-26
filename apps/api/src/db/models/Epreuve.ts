import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Epreuve extends Model {
  declare idEpreuve: number;
  declare libelle: string;
  declare urlDoc: string;
  declare auteur: string;
  declare idNature: number;
  declare idPers: number;
  declare created_at: Date;
  declare isDelete: number | null;
}
Epreuve.init(
  {
    idEpreuve: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(255),
    urlDoc: DataTypes.STRING(255),
    auteur: DataTypes.STRING(255),
    idNature: DataTypes.INTEGER.UNSIGNED,
    idPers: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Epreuve' }
);
