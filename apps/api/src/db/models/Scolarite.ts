import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../index';

const def = { sequelize, timestamps: false };

export class Scolarite extends Model {
  declare idScolarite: number;
  declare inscription: number;
  declare pension: number;
  declare nbreTranche: number;
  declare description: string;
  declare idCycle: number;
  declare idFondateur: number;
  declare created_at: Date;
}
Scolarite.init(
  {
    idScolarite: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
    inscription: DataTypes.FLOAT,
    pension: DataTypes.FLOAT,
    nbreTranche: DataTypes.SMALLINT,
    description: DataTypes.TEXT,
    idCycle: DataTypes.INTEGER.UNSIGNED,
    idFondateur: DataTypes.INTEGER.UNSIGNED,
    created_at: DataTypes.DATE,
  },
  { ...def, tableName: 'Scolarite' }
);
