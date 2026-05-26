import bcrypt from 'bcryptjs';
import { sequelize } from '../db';
import {
  Admin, Personne, Eleve, Parents, VilleNaissance, Cycle, Classe, Salle,
  AnneeAcademique, Trimestre, Session, Cours, NatureEpreuve, Epreuve,
  Mode, Specialite, Scolarite, Tranches, Frequente, Enseignant, EmploiDuTemps
} from '../db/models';

async function seed() {
  await sequelize.authenticate();

  const hashRoot = bcrypt.hashSync('root123', 12);
  const hashParent = bcrypt.hashSync('parent123', 12);
  const hashEns = bcrypt.hashSync('ens123', 12);

  // ---------- 1. ADMIN ROOT ----------
  const [admin] = await Admin.findOrCreate({
    where: { username: 'root' },
    defaults: {
      ID: 1,
      nom: 'Root',
      username: 'root',
      password: hashRoot,
      actif: 1,
      typeAdmin: 0,
      mobile: '',
      created_at: new Date(),
      isDelete: 0,
    },
  });
  const idAdmin = admin.ID;  // sera 1 (ou autre si déjà existant)

    // Admin Inscriptions (typeAdmin=1)
  await Admin.findOrCreate({
    where: { username: 'admin_inscriptions' },
    defaults: { ID: 10, nom: 'Admin Inscriptions', username: 'admin_inscriptions',
      password: bcrypt.hashSync('admin123', 12), actif: 1, typeAdmin: 1, mobile: '',
      created_at: new Date(), isDelete: 0 }
  });
  // Fondateur (typeAdmin=2)
  await Admin.findOrCreate({
    where: { username: 'fondateur' },
    defaults: { ID: 11, nom: 'Fondateur', username: 'fondateur',
      password: bcrypt.hashSync('fondateur123', 12), actif: 1, typeAdmin: 2, mobile: '',
      created_at: new Date(), isDelete: 0 }
  });
  // Admin Scolarité (typeAdmin=4)
  await Admin.findOrCreate({
    where: { username: 'admin_scolarite' },
    defaults: { ID: 12, nom: 'Admin Scolarité', username: 'admin_scolarite',
      password: bcrypt.hashSync('scolarite123', 12), actif: 1, typeAdmin: 4, mobile: '',
      created_at: new Date(), isDelete: 0 }
  });
  // Directeur (typeAdmin=3) – pour bulletins
  await Admin.findOrCreate({
    where: { username: 'directeur' },
    defaults: { ID: 13, nom: 'Directeur', username: 'directeur',
      password: bcrypt.hashSync('directeur123', 12), actif: 1, typeAdmin: 3, mobile: '',
      created_at: new Date(), isDelete: 0 }
  });

  // ---------- 2. PERSONNES ----------
  const [parent] = await Personne.findOrCreate({
    where: { username: 'parent_test' },
    defaults: {
      idPers: 2,
      nom: 'Parent',
      prenom: 'Test',
      dateNaissance: new Date('1990-01-01'),
      lieuNaissance: 'Yaoundé',
      mobile: '699000001',
      phone: '',
      email: '',
      typePersonne: 4,
      username: 'parent_test',
      password: hashParent,
      idAdmin: idAdmin,
      created_at: new Date(),
      isDelete: 0,
    },
  });

  const [enseignant] = await Personne.findOrCreate({
    where: { username: 'ens_test' },
    defaults: {
      idPers: 3,
      nom: 'Enseignant',
      prenom: 'Test',
      dateNaissance: new Date('1985-01-01'),
      lieuNaissance: 'Yaoundé',
      mobile: '699000002',
      phone: '',
      email: '',
      typePersonne: 1,
      username: 'ens_test',
      password: hashEns,
      idAdmin: idAdmin,
      created_at: new Date(),
      isDelete: 0,
    },
  });

  // ---------- 3. RÉFÉRENTIELS ----------
  // VilleNaissance : idVille, libelle, actif
  await VilleNaissance.findOrCreate({
    where: { libelle: 'Yaoundé' },
    defaults: { idVille: 1, libelle: 'Yaoundé', actif: 1 },
  });

  // Cycle : idCycle, libelle, description, idAdmin, created, isDelete
  await Cycle.findOrCreate({
    where: { libelle: 'Primaire' },
    defaults: {
      idCycle: 1,
      libelle: 'Primaire',
      description: '',
      idAdmin: idAdmin,
      created: new Date(),
      isDelete: 0,
    },
  });

  // Classe : idClasse, libelle, idCycle, idAdmin, created_at, isDelete
  await Classe.findOrCreate({
    where: { libelle: 'CP' },
    defaults: {
      idClasse: 1,
      libelle: 'CP',
      idCycle: 1,
      idAdmin: idAdmin,
      created_at: new Date(),
      isDelete: 0,
    },
  });

  // Salle : idSalle, libelle, position, surface, idClasse, actif, idAdmin, created_at
  await Salle.findOrCreate({
    where: { libelle: 'Salle 1' },
    defaults: {
      idSalle: 1,
      libelle: 'Salle 1',
      position: 'RDC',
      surface: 50,
      idClasse: 1,
      actif: 1,
      idAdmin: idAdmin,
      created_at: new Date(),
    },
  });

  // AnneeAcademique : idAnnee, libelle, periode, created_at, idAdmin, isDelete
  await AnneeAcademique.findOrCreate({
    where: { libelle: '2025-2026' },
    defaults: {
      idAnnee: 1,
      libelle: '2025-2026',
      periode: '2025-09-01:2026-06-30',
      created_at: new Date(),
      idAdmin: idAdmin,
      isDelete: 0,
    },
  });

  // Trimestre : idTrimes, libelle, periode, idAca, idAdmin
  await Trimestre.findOrCreate({
    where: { libelle: '1er Trimestre', idAca: 1 },
    defaults: {
      idTrimes: 1,
      libelle: '1er Trimestre',
      periode: '2025-09-01:2025-12-20',
      idAca: 1,
      idAdmin: idAdmin,
    },
  });

  // Session : idSession, libelle, description, idTrimestre, idPers, date_passage, created_at
  await Session.findOrCreate({
    where: { libelle: 'CC1', idTrimestre: 1 },
    defaults: {
      idSession: 1,
      libelle: 'CC1',
      description: 'Contrôle Continu 1',
      idTrimestre: 1,
      idPers: enseignant.idPers, // optionnel
      date_passage: new Date(),
      created_at: new Date(),
    },
  });

  // Cours : idCours, libelle, note, coefficient, description, idClasse, actif, idAdmin, created_at, isDelete
  await Cours.findOrCreate({
    where: { libelle: 'Mathématiques', idClasse: 1 },
    defaults: {
      idCours: 1,
      libelle: 'Mathématiques',
      note: 20,
      coefficient: 1,
      description: '',
      idClasse: 1,
      actif: 1,
      idAdmin: idAdmin,
      created_at: new Date(),
      isDelete: 0,
    },
  });

  // NatureEpreuve : idNature, libelle, description
  await NatureEpreuve.findOrCreate({
    where: { libelle: 'CC' },
    defaults: { idNature: 1, libelle: 'CC', description: 'Contrôle Continu' },
  });

  // Epreuve : idEpreuve, libelle, urlDoc, auteur, idNature, idPers, created_at, isDelete
  await Epreuve.findOrCreate({
    where: { libelle: 'CC1 Math' },
    defaults: {
      idEpreuve: 1,
      libelle: 'CC1 Math',
      urlDoc: '',
      auteur: '',
      idNature: 1,
      idPers: enseignant.idPers,
      created_at: new Date(),
      isDelete: 0,
    },
  });

  // Mode : idMode, libelle, information, actif, idFondateur, created_at
  await Mode.findOrCreate({
    where: { libelle: 'Espèces' },
    defaults: {
      idMode: 1,
      libelle: 'Espèces',
      information: '',
      actif: 1,
      idFondateur: idAdmin, // Fondateur = même admin
      created_at: new Date(),
    },
  });

  // Specialite : idSpecialite, libelle, idAdmin
  await Specialite.findOrCreate({
    where: { libelle: 'Mathématiques' },
    defaults: { idSpecialite: 1, libelle: 'Mathématiques', idAdmin: idAdmin },
  });

  // Scolarite : idScolarite, inscription, pension, nbreTranche, description, idCycle, idFondateur, created_at
  await Scolarite.findOrCreate({
    where: { idCycle: 1, description: 'Primaire' },
    defaults: {
      idScolarite: 1,
      inscription: 50000,
      pension: 100000,
      nbreTranche: 3,
      description: 'Primaire',
      idCycle: 1,
      idFondateur: idAdmin,
      created_at: new Date(),
    },
  });

  // Tranches : idTranche, libelle, montant, delai_mois, delai_jour, idScolarite, actif, idFondateur
  await Tranches.findOrCreate({
    where: { libelle: '1ère tranche', idScolarite: 1 },
    defaults: {
      idTranche: 1,
      libelle: '1ère tranche',
      montant: 50000,
      delai_mois: '09',
      delai_jour: '30',
      idScolarite: 1,
      actif: 1,
      idFondateur: idAdmin,
    },
  });

  // ---------- 4. ÉLÈVE (matricule=100) ----------
  // Eleve : matricule, nom, prenom, dateNaissance, lieuNaissance, sexe, langue, photoURL, actif, idVilleNaissance, idAdmin, created_at, isDelete
  await Eleve.findOrCreate({
    where: { matricule: 100 },
    defaults: {
      matricule: 100,
      nom: 'Enfant',
      prenom: 'Parent',
      dateNaissance: new Date('2015-05-05'),
      lieuNaissance: 'Yaoundé',
      sexe: 1,
      langue: 'Français',
      photoURL: 'https://i.pravatar.cc/150?img=3',  // URL aléatoire fonctionnelle
      actif: 1,
      idVilleNaissance: 1,
      idAdmin: idAdmin,
      created_at: new Date(),
      isDelete: 0,
    },
  });

  // Parents : idParent, idPers, matricule, idAdmin, created_at, isDelete
  await Parents.findOrCreate({
    where: { idPers: parent.idPers, matricule: 100, isDelete: 0 },
    defaults: {
      idParent: 1,
      idPers: parent.idPers,
      matricule: 100,
      idAdmin: idAdmin,
      created_at: new Date(),
      isDelete: 0,
    },
  });

  // Frequente : idFrequente, idSalle, idAcademi, matricule, commentaire, idAdmin, created_at
  await Frequente.findOrCreate({
    where: { matricule: 100, idAcademi: 1 },
    defaults: {
      idFrequente: 1,
      idSalle: 1,
      idAcademi: 1,
      matricule: 100,
      commentaire: '',
      idAdmin: idAdmin,
      created_at: new Date(),
    },
  });

  // ---------- 5. ENSEIGNANT & EMPLOI DU TEMPS ----------
  // Enseignant : idEnseignant, idPers, idCours, Actif, idAdmin, created_at, isDelete
  await Enseignant.findOrCreate({
    where: { idPers: enseignant.idPers, idCours: 1 },
    defaults: {
      idEnseignant: 1,
      idPers: enseignant.idPers,
      idCours: 1,
      Actif: 1,
      idAdmin: idAdmin,
      created_at: new Date(),
      isDelete: 0,
    },
  });

  // EmploiDuTemps : idTemps, jour, heure, idClasse, idCours, idAdmin, created_at
  await EmploiDuTemps.findOrCreate({
    where: { jour: 'Lundi', heure: '08:00', idClasse: 1, idCours: 1 },
    defaults: {
      idTemps: 1,
      jour: 'Lundi',
      heure: '08:00',
      idClasse: 1,
      idCours: 1,
      idAdmin: idAdmin,
      created_at: new Date(),
    },
  });

  console.log('✅ Seed terminé avec succès (sans erreurs de champs manquants) !');
  await sequelize.close();
}

seed().catch(err => {
  console.error('❌ Erreur seed :', err);
  process.exit(1);
});