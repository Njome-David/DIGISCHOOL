import { sequelize } from '../db';

export interface CoursMoyenne {
  idCours: number;
  libelle: string;
  coefficient: number;
  moyenne_eleve: number;
  moyenne_classe: number;
  appreciation: string;
}

/**
 * Calcule la moyenne d'un élève par cours pour une session donnée.
 * Retourne aussi la moyenne de la classe pour comparaison.
 */
export async function moyenneParCoursSession(
  matricule: number,
  idSession: number
): Promise<CoursMoyenne[]> {
  const [results] = await sequelize.query(
    `SELECT
       c.idCours,
       c.libelle,
       c.coefficient,
       ROUND(AVG(e.note), 2)          AS moyenne_eleve,
       ROUND(
         (SELECT AVG(e2.note)
          FROM Evaluation e2
          WHERE e2.idCours = e.idCours
            AND e2.idSession = :session), 2
       )                               AS moyenne_classe,
       MAX(e.appreciation)             AS appreciation
     FROM Evaluation e
     JOIN Cours c ON c.idCours = e.idCours
     WHERE e.matricule = :matricule
       AND e.idSession = :session
     GROUP BY e.idCours, c.libelle, c.coefficient`,
    { replacements: { matricule, session: idSession }, raw: true }
  );
  return results as CoursMoyenne[];
}

/**
 * Calcule la moyenne générale pondérée d'un élève pour un trimestre.
 * Formule : SUM(note * coefficient) / SUM(coefficient)
 */
export async function moyenneTrimestrielle(
  matricule: number,
  idTrimestre: number
): Promise<number> {
  const [rows] = await sequelize.query(
    `SELECT
       ROUND(
         SUM(e.note * c.coefficient) / NULLIF(SUM(c.coefficient), 0),
         2
       ) AS moy_gen
     FROM Evaluation e
     JOIN Cours c   ON c.idCours   = e.idCours
     JOIN Session s ON s.idSession = e.idSession
     WHERE e.matricule  = :matricule
       AND s.idTrimestre = :trimestre`,
    { replacements: { matricule, trimestre: idTrimestre }, raw: true }
  );
  return Number((rows as any[])[0]?.moy_gen ?? 0);
}

/**
 * Calcule le rang d'un élève dans sa salle pour un trimestre donné.
 * Utilise RANK() OVER pour le classement SQL.
 */
export async function rangDansSalle(
  matricule: number,
  idSalle: number,
  idTrimestre: number
): Promise<number> {
  const [rows] = await sequelize.query(
    `SELECT rang FROM (
       SELECT
         f.matricule,
         RANK() OVER (
           ORDER BY SUM(e.note * c.coefficient) / NULLIF(SUM(c.coefficient), 0) DESC
         ) AS rang
       FROM Frequente f
       JOIN Evaluation e ON e.matricule = f.matricule
       JOIN Session s    ON s.idSession = e.idSession
       JOIN Cours c      ON c.idCours   = e.idCours
       WHERE f.idSalle     = :salle
         AND s.idTrimestre = :trimestre
       GROUP BY f.matricule
     ) ranked
     WHERE matricule = :matricule`,
    { replacements: { salle: idSalle, trimestre: idTrimestre, matricule }, raw: true }
  );
  return Number((rows as any[])[0]?.rang ?? 0);
}
