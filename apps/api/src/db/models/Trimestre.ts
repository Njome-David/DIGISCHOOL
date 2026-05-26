import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Trimestre extends Model {
  declare idTrimes: number;
  declare libelle: string;
  declare periode: string;
  declare idAca: number;
  declare idAdmin: number;
}
Trimestre.init(
  {
    idTrimes: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(255),
    periode: DataTypes.STRING(255),
    idAca: DataTypes.INTEGER.UNSIGNED,
    idAdmin: DataTypes.INTEGER,
  },
  { ...def, tableName: 'Trimestre' }
);
