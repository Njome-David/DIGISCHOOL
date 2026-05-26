import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Eleve extends Model {
  declare matricule: number;
  declare nom: string;
  declare prenom: string;
  declare dateNaissance: Date;
  declare lieuNaissance: string;
  declare sexe: number;
  declare langue: string;
  declare photoURL: string;
  declare actif: number;
  declare idVilleNaissance: number;
  declare idAdmin: number;
  declare created_at: Date;
  declare isDelete: number;
}
Eleve.init(
  {
    matricule: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    nom: DataTypes.STRING(60),
    prenom: DataTypes.STRING(60),
    dateNaissance: DataTypes.DATEONLY,
    lieuNaissance: DataTypes.STRING(30),
    sexe: DataTypes.SMALLINT,
    langue: DataTypes.STRING(30),
    photoURL: DataTypes.STRING(255),
    actif: DataTypes.TINYINT,
    idVilleNaissance: DataTypes.INTEGER.UNSIGNED,
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Eleve' }
);
