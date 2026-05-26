import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Enseignant extends Model {
  declare idEnseignant: number;
  declare idPers: number;
  declare idCours: number;
  declare Actif: number;
  declare idAdmin: number;
  declare created_at: Date;
  declare isDelete: number;
}
Enseignant.init(
  {
    idEnseignant: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    idPers: DataTypes.INTEGER.UNSIGNED,
    idCours: DataTypes.INTEGER.UNSIGNED,
    Actif: DataTypes.TINYINT,
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Enseignant' }
);
