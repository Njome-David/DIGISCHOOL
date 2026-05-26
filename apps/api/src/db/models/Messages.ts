import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Messages extends Model {
  declare idMessages: number;
  declare idExp_Pers: number;
  declare idParent: number;
  declare objet: string;
  declare information: string;
  declare type_message: number;
  declare AnneeAcade: string;
  declare created_at: Date;
  declare valider: number;
}
Messages.init(
  {
    idMessages: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    idExp_Pers: DataTypes.INTEGER.UNSIGNED,
    idParent: DataTypes.INTEGER.UNSIGNED,
    objet: DataTypes.STRING(255),
    information: DataTypes.TEXT,
    type_message: DataTypes.SMALLINT,
    AnneeAcade: DataTypes.STRING(15),
    created_at: DataTypes.DATE,
    valider: DataTypes.TINYINT,
  },
  { ...def, tableName: 'Messages' }
);
