import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Personne extends Model {
  declare idPers: number;
  declare nom: string;
  declare prenom: string;
  declare dateNaissance: Date;
  declare lieuNaissance: string;
  declare mobile: string;
  declare phone: string;
  declare email: string | null;
  declare typePersonne: number;
  declare username: string;
  declare password: string;
  declare alanyaID: string | null;
  declare idAdmin: number;
  declare created_at: Date;
  declare isDelete: number;
}
Personne.init(
  {
    idPers: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    nom: DataTypes.STRING(255),
    prenom: DataTypes.STRING(255),
    dateNaissance: DataTypes.DATEONLY,
    lieuNaissance: DataTypes.STRING(100),
    mobile: DataTypes.STRING(15),
    phone: DataTypes.STRING(15),
    email: DataTypes.STRING(255),
    typePersonne: DataTypes.SMALLINT,
    username: DataTypes.STRING(100),
    password: DataTypes.STRING(100),
    alanyaID: DataTypes.STRING(15),
    idAdmin: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
    isDelete: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Personne' }
);
