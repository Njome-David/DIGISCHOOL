import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Livres extends Model {
  declare idLivre: number;
  declare titre: string;
  declare auteurs: string;
  declare prix: number;
  declare idSpecialite: number;
  declare edition: string;
  declare annee_parution: Date | null;
  declare totalCopie: number;
  declare idAdmin: number;
  declare created_at: Date;
}
Livres.init(
  {
    idLivre: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    titre: DataTypes.STRING(255),
    auteurs: DataTypes.STRING(255),
    prix: DataTypes.FLOAT,
    idSpecialite: DataTypes.INTEGER.UNSIGNED,
    edition: DataTypes.STRING(255),
    annee_parution: DataTypes.DATEONLY,
    totalCopie: DataTypes.SMALLINT,
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
  },
  { ...def, tableName: 'Livres' }
);
