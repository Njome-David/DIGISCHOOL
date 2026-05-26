import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class AnneeAcademique extends Model {
  declare idAnnee: number;
  declare libelle: string;
  declare periode: string;
  declare created_at: Date;
  declare idAdmin: number;
  declare isDelete: number;
}
AnneeAcademique.init(
  {
    idAnnee: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(200),
    periode: DataTypes.STRING(255),
    created_at: DataTypes.DATEONLY,
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'AnneeAcademique' }
);
