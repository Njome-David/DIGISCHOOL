import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Bulletin extends Model {
  declare id: number;
  declare matricule: number;
  declare idTrimestre: number;
  declare moyenne: number;
  declare rang: number | null;
  declare valide: number;
  declare urlPdf: string | null;
  declare generatedAt: Date;
}
Bulletin.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    matricule: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    idTrimestre: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    moyenne: { type: DataTypes.FLOAT, defaultValue: 0 },
    rang: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    valide: { type: DataTypes.TINYINT, defaultValue: 0 },
    urlPdf: { type: DataTypes.STRING(255), allowNull: true },
    generatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'Bulletins', timestamps: true }
);
