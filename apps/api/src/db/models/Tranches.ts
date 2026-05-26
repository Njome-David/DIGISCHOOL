import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Tranches extends Model {
  declare idTranche: number;
  declare libelle: string;
  declare montant: number;
  declare delai_mois: string;
  declare delai_jour: string;
  declare idScolarite: number;
  declare actif: number;
  declare idFondateur: number;
}
Tranches.init(
  {
    idTranche: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(255),
    montant: DataTypes.FLOAT,
    delai_mois: DataTypes.CHAR(2),
    delai_jour: DataTypes.CHAR(2),
    idScolarite: DataTypes.INTEGER.UNSIGNED,
    actif: DataTypes.TINYINT,
    idFondateur: DataTypes.INTEGER.UNSIGNED,
  },
  { ...def, tableName: 'Tranches' }
);
