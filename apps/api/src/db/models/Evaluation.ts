import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Evaluation extends Model {
  declare idEval: number;
  declare note: number;
  declare appreciation: string;
  declare matricule: number;
  declare idEpreuve: number;
  declare idCours: number;
  declare idSession: number;
  declare idPers: number;
  declare created_at: Date;
}
Evaluation.init(
  {
    idEval: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    note: DataTypes.FLOAT,
    appreciation: DataTypes.STRING(255),
    matricule: DataTypes.INTEGER.UNSIGNED,
    idEpreuve: DataTypes.INTEGER.UNSIGNED,
    idCours: DataTypes.INTEGER.UNSIGNED,
    idSession: DataTypes.INTEGER.UNSIGNED,
    idPers: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
  },
  { ...def, tableName: 'Evaluation' }
);
