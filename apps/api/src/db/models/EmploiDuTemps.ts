import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class EmploiDuTemps extends Model {
  declare idTemps: number;
  declare jour: string;
  declare heure: string;
  declare idClasse: number;
  declare idCours: number;
  declare idAdmin: number;
  declare created_at: Date;
}
EmploiDuTemps.init(
  {
    idTemps: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    jour: DataTypes.STRING(30),
    heure: DataTypes.STRING(6),
    idClasse: DataTypes.INTEGER.UNSIGNED,
    idCours: DataTypes.INTEGER.UNSIGNED,
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
  },
  { ...def, tableName: 'EmploiDuTemps' }
);
