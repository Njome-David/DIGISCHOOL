import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Paiement extends Model {
  declare idPaie: number;
  declare matricule: number;
  declare idAca: number;
  declare montant: number;
  declare url: string;
  declare comentaire: string;
  declare idMode: number;
  declare operation_ID: string;
  declare idPers: number;
  declare datePaie: Date;
  declare dateEnregistrer: Date;
}
Paiement.init(
  {
    idPaie: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    matricule: DataTypes.INTEGER.UNSIGNED,
    idAca: DataTypes.INTEGER.UNSIGNED,
    montant: DataTypes.FLOAT,
    url: DataTypes.STRING(255),
    comentaire: DataTypes.STRING(255),
    idMode: DataTypes.INTEGER.UNSIGNED,
    operation_ID: DataTypes.STRING(30),
    idPers: DataTypes.INTEGER.UNSIGNED,
    datePaie: DataTypes.DATEONLY,
    dateEnregistrer: DataTypes.DATE,
  },
  { ...def, tableName: 'Paiement' }
);
