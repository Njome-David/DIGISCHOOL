import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Rapport extends Model {
  declare idRap: number;
  declare libelle: string;
  declare points: number;
  declare matricule: number;
  declare idAca: number;
  declare commentaire: string;
  declare event_date: Date;
  declare idPers: number;
  declare created_at: Date;
  declare isDelete: number;
}
Rapport.init(
  {
    idRap: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING,
    points: DataTypes.INTEGER.UNSIGNED,
    matricule: DataTypes.INTEGER.UNSIGNED,
    idAca: DataTypes.INTEGER.UNSIGNED,
    commentaire: DataTypes.TEXT,
    event_date: DataTypes.DATEONLY,
    idPers: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Rapport' }
);
