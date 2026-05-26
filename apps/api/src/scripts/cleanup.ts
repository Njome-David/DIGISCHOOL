import { sequelize } from '../db';
import {
  Admin, Personne, Eleve, Parents, Cycle, Classe, Salle, AnneeAcademique,
  Trimestre, Session, Cours, NatureEpreuve, Epreuve, Mode, Specialite,
  Scolarite, Tranches, Frequente, Enseignant, EmploiDuTemps, Evaluation,
  Paiement, Messages, Rapport, Livres, Bulletin, AuditLog, RefreshToken
} from '../db/models';
import { Op } from 'sequelize';

async function cleanup() {
  await sequelize.authenticate();

  // ── Admins de test ──────────────────────────────────────────────────────────
  await Admin.destroy({
    where: {
      username: {
        [Op.in]: [
          'admin_inscriptions',
          'fondateur',
          'admin_scolarite',
          'directeur',
          'admin_test_postman',
        ],
      },
    },
  });

  // ── Personnels de test ──────────────────────────────────────────────────────
  await Personne.destroy({
    where: {
      username: {
        [Op.in]: ['mdupont_postman'],
      },
    },
  });

  // ── Élèves créés par POST /students ────────────────────────────────────────
  await Eleve.update(
    { isDelete: 1 },
    { where: { nom: 'Eleve' } }
  );

  const testMatricules = (await Eleve.findAll({
    where: { nom: 'Eleve' },
    attributes: ['matricule'],
    raw: true,
  })).map((e: any) => e.matricule);

  // ── Dépendances des élèves de test ─────────────────────────────────────────
  if (testMatricules.length > 0) {
    await Parents.update(
      { isDelete: 1 },
      { where: { matricule: { [Op.in]: testMatricules } } }
    );
    await Frequente.destroy({ where: { matricule: { [Op.in]: testMatricules } } });
    await Evaluation.destroy({ where: { matricule: { [Op.in]: testMatricules } } });
    await Paiement.destroy({ where: { matricule: { [Op.in]: testMatricules } } });
    await Rapport.update(
      { isDelete: 1 },
      { where: { matricule: { [Op.in]: testMatricules } } }
    );
    // Bulletins (table applicative)
    await Bulletin.destroy({ where: { matricule: { [Op.in]: testMatricules } } });
  }

  // ── Parents liés par POST /students/:matricule/parents ─────────────────────
  // Liens créés sur matricule 100 (seed) par le test "nouveau lien" — idPers=2
  // On ne supprime PAS le lien seed (idParent=1), seulement ceux créés après
  await Parents.destroy({
    where: {
      matricule: 100,
      isDelete: 0,
      idParent: { [Op.gt]: 1 }, // idParent=1 = seed, on le garde
    },
    force: true,
  } as any);

  // ── Messages de test ────────────────────────────────────────────────────────
  await Messages.destroy({
    where: {
      objet: { [Op.in]: ['Test Postman', 'Rappel test'] },
    },
  });
  // Messages de relance créés par POST /payments/reminders (type_message=2)
  await Messages.destroy({
    where: { type_message: 2 },
  });

  // ── Cycles/Classes/Salles créés par les tests ───────────────────────────────
  await Cycle.destroy({ where: { libelle: 'Cycle Test Postman' } });

  // ── Livres créés par les tests ──────────────────────────────────────────────
  await Livres.destroy({ where: { titre: 'Maths CE2' } });

  // ── Évaluations créées sur élève seed (matricule=100) par /exams/1/grades ──
  // On supprime celles créées après le seed (idEval > 0 et matricule=100)
  // On garde uniquement celles créées par le seed si elles existent
  // Identifiées par idPers = enseignant seed (idPers=3) et idEpreuve=1 idCours=1
  await Evaluation.destroy({
    where: {
      matricule: 100,
      idEpreuve: 1,
      idCours: 1,
    },
  });

  // ── Paiements sur élève seed ────────────────────────────────────────────────
  await Paiement.destroy({ where: { matricule: 100 } });

  // ── Bulletins sur élève seed ────────────────────────────────────────────────
  await Bulletin.destroy({ where: { matricule: 100 } });

  // ── Refresh tokens (évite accumulation) ────────────────────────────────────
  await RefreshToken.destroy({ where: { expiresAt: { [Op.lt]: new Date() } } });

  // ── Audit logs de test (optionnel — garde un historique propre) ─────────────
  // await AuditLog.destroy({ where: { createdAt: { [Op.lt]: new Date() } } });

  // ── Rapport discipline sur élève seed ──────────────────────────────────────
  await Rapport.update(
    { isDelete: 1 },
    { where: { matricule: 100, commentaire: { [Op.like]: '%Arrivé en retard%' } } }
  );
  // Rapports approuvés par le test approve
  await Rapport.update(
    { isDelete: 1 },
    { where: { commentaire: { [Op.like]: '[APPROUVÉ%' } } }
  );

  // ── Cycles mis à jour par PATCH — restaurer le libellé original ─────────────
  await Cycle.update(
    { libelle: 'Primaire' },
    { where: { libelle: 'Primaire Updated' } }
  );
  await Classe.update(
    { libelle: 'CP' },
    { where: { libelle: 'CP Updated' } }
  );
  await Salle.update(
    { position: 'RDC' },
    { where: { libelle: 'Salle 1', position: '1er étage' } }
  );

  console.log('✅ Nettoyage terminé.');
  await sequelize.close();
}

cleanup().catch(err => {
  console.error('❌ Erreur cleanup :', err);
  process.exit(1);
});