import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Session extends Model {
  declare idSession: number;
  declare libelle: string;
  declare description: string | null;
  declare idTrimestre: number;
  declare idPers: number;
  declare date_passage: Date | null;
  declare created_at: Date;
}
Session.init(
  {
    idSession: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(255),
    description: DataTypes.TEXT,
    idTrimestre: DataTypes.INTEGER.UNSIGNED,
    idPers: DataTypes.INTEGER.UNSIGNED,
    date_passage: DataTypes.DATEONLY,
    created_at: DataTypes.DATE,
  },
  { ...def, tableName: 'Session' }
);
