import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Discipline extends Model {
  declare ID: number;
  declare libelle: string;
  declare points: number;
}
Discipline.init(
  {
    ID: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    libelle: DataTypes.STRING(255),
    points: DataTypes.INTEGER.UNSIGNED,
  },
  { ...def, tableName: 'Discipline' }
);
