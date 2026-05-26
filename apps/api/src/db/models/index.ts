import { sequelize } from '../index';

import { RefreshToken } from './RefreshToken';
export { RefreshToken };
import { AuditLog } from './AuditLog';
export { AuditLog };
import { Bulletin } from './Bulletin';
export { Bulletin };
import { Admin } from './Admin';
export { Admin };
import { Personne } from './Personne';
export { Personne };
import { Eleve } from './Eleve';
export { Eleve };
import { Parents } from './Parents';
export { Parents };
import { Cycle } from './Cycle';
export { Cycle };
import { Classe } from './Classe';
export { Classe };
import { Salle } from './Salle';
export { Salle };
import { AnneeAcademique } from './AnneeAcademique';
export { AnneeAcademique };
import { Trimestre } from './Trimestre';
export { Trimestre };
import { Session } from './Session';
export { Session };
import { Cours } from './Cours';
export { Cours };
import { Enseignant } from './Enseignant';
export { Enseignant };
import { EmploiDuTemps } from './EmploiDuTemps';
export { EmploiDuTemps };
import { NatureEpreuve } from './NatureEpreuve';
export { NatureEpreuve };
import { Epreuve } from './Epreuve';
export { Epreuve };
import { Evaluation } from './Evaluation';
export { Evaluation };
import { Frequente } from './Frequente';
export { Frequente };
import { Scolarite } from './Scolarite';
export { Scolarite };
import { Tranches } from './Tranches';
export { Tranches };
import { Mode } from './Mode';
export { Mode };
import { Paiement } from './Paiement';
export { Paiement };
import { Messages } from './Messages';
export { Messages };
import { Discipline } from './Discipline';
export { Discipline };
import { Rapport } from './Rapport';
export { Rapport };
import { Livres } from './Livres';
export { Livres };
import { VilleNaissance } from './VilleNaissance';
export { VilleNaissance };
import { Specialite } from './Specialite';
export { Specialite };

// Associations
Classe.belongsTo(Cycle, { foreignKey: 'idCycle' });
Cycle.hasMany(Classe, { foreignKey: 'idCycle' });
Salle.belongsTo(Classe, { foreignKey: 'idClasse' });
Cours.belongsTo(Classe, { foreignKey: 'idClasse' });
Eleve.belongsTo(VilleNaissance, { foreignKey: 'idVilleNaissance' });
Parents.belongsTo(Personne, { foreignKey: 'idPers' });
Parents.belongsTo(Eleve, { foreignKey: 'matricule' });
Frequente.belongsTo(Eleve, { foreignKey: 'matricule' });
Frequente.belongsTo(Salle, { foreignKey: 'idSalle' });
Frequente.belongsTo(AnneeAcademique, { foreignKey: 'idAcademi' });
Trimestre.belongsTo(AnneeAcademique, { foreignKey: 'idAca' });
Session.belongsTo(Trimestre, { foreignKey: 'idTrimestre' });
Evaluation.belongsTo(Eleve, { foreignKey: 'matricule' });
Evaluation.belongsTo(Epreuve, { foreignKey: 'idEpreuve' });
Evaluation.belongsTo(Cours, { foreignKey: 'idCours' });
Paiement.belongsTo(Eleve, { foreignKey: 'matricule' });
Paiement.belongsTo(Mode, { foreignKey: 'idMode' });
Tranches.belongsTo(Scolarite, { foreignKey: 'idScolarite' });
Scolarite.belongsTo(Cycle, { foreignKey: 'idCycle' });
Enseignant.belongsTo(Personne, { foreignKey: 'idPers' });
Enseignant.belongsTo(Cours, { foreignKey: 'idCours' });
EmploiDuTemps.belongsTo(Classe, { foreignKey: 'idClasse' });
EmploiDuTemps.belongsTo(Cours, { foreignKey: 'idCours' });
Messages.belongsTo(Parents, { foreignKey: 'idParent' });
Rapport.belongsTo(Eleve, { foreignKey: 'matricule' });
Livres.belongsTo(Specialite, { foreignKey: 'idSpecialite' });
Specialite.hasMany(Livres, { foreignKey: 'idSpecialite' });

export const models = {
  RefreshToken,
  AuditLog,
  Bulletin,
  Admin,
  Personne,
  Eleve,
  Parents,
  Cycle,
  Classe,
  Salle,
  AnneeAcademique,
  Trimestre,
  Session,
  Cours,
  Enseignant,
  EmploiDuTemps,
  NatureEpreuve,
  Epreuve,
  Evaluation,
  Frequente,
  Scolarite,
  Tranches,
  Mode,
  Paiement,
  Messages,
  Discipline,
  Rapport,
  Livres,
  VilleNaissance,
  Specialite,
};

export async function syncAppTables() {
  await RefreshToken.sync();
  await AuditLog.sync();
  await Bulletin.sync();
}
