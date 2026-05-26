import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Classe extends Model {
  declare idClasse: number;
  declare libelle: string;
  declare idCycle: number;
  declare idAdmin: number;
  declare created_at: Date;
  declare isDelete: number;
}
Classe.init(
  {
    idClasse: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(100),
    idCycle: DataTypes.INTEGER.UNSIGNED,
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Classe' }
);
