# EcoleApp — Backend roadmap (référence agent)

> **Usage** : fichier de référence unique pour compléter le backend à 100%.  
> **Statut actuel** : backend gelé — testé Postman, suffisant pour brancher le frontend.  
> **Ne pas modifier l’API existante** tant que la phase frontend n’est pas avancée sous guidance utilisateur.

**Décisions projet (2026-06-03)**
| # | Sujet | Décision |
|---|--------|----------|
| 1 | Directeur | Suivre doc fonctionnel → 3 validations (messages collectifs, bulletins, rapports discipline graves) |
| 2 | Admin Auditeur `typeAdmin=5` | Oui |
| 3 | Tables applicatives `Bulletin`, `AuditLog`, `RefreshToken` | Oui |
| 4 | Présences / absences | Suivre doc fonctionnel → **hors catalogue FNC** (pas de module dédié ; ne pas prioriser sauf ajout encadreur) |
| 5 | Prochaine étape | Frontend (`apps/web` — structure seule) ; backend inchangé |

---

## A. Backend vital — OK pour le frontend (ne pas casser)

Ces endpoints/comportements existent dans `apps/api/src/routes/api.ts` et suffisent pour une première intégration front.

### Auth & session
- [x] `POST /auth/login`, `/auth/refresh`, `/auth/logout`
- [x] `POST /auth/change-password`, `GET /me`
- [x] JWT + refresh cookie, RBAC 8 rôles (`@ecole/shared`)
- [x] Scope parent (`childrenMatricules`)
- [ ] Front : gérer `mustChangePassword` → redirect `/change-password`

### Comptes (lecture / admin root)
- [x] `GET/POST/PATCH/DELETE /admins`
- [x] `GET/POST/DELETE /personnel`, `GET /parents`
- [x] `POST /personnel/:id/send-credentials` (stub — voir backlog)

### Élèves
- [x] `GET/POST /students`, `GET/PATCH /students/:matricule`
- [x] `POST /students/:matricule/assign-room`
- [x] `POST/DELETE /students/:matricule/parents`
- [x] `GET .../payments`, `.../grades`, `.../discipline`
- [x] `POST /students/:matricule/photo`

### Référentiels (lecture + création root partielle)
- [x] `GET/POST/PATCH` cycles, classes, salles
- [x] `GET/POST` academic-years
- [x] `GET` trimestres, sessions, courses, villes, natures-epreuve
- [x] `GET` schedules (`:classId`, `/my` enseignant)

### Pédagogie & notes
- [x] `GET/POST /exams`, `GET /exams/:id/file`
- [x] `GET/POST/PATCH /evaluations`, `POST /evaluations/bulk`, `POST /exams/:id/grades`

### Bulletins (données, pas PDF)
- [x] `GET /bulletins/:matricule/:trimestre` (parent si `valide`)
- [x] `POST /bulletins/generate`, `POST /bulletins/:id/validate`

### Scolarité
- [x] `GET/POST /payments`, `GET /payments/:id/receipt.pdf`
- [x] `GET /payments/overdue`, `POST /payments/reminders`
- [x] `GET/POST` tuitions, tranches, modes

### Communication & discipline
- [x] `GET/POST /messages`, `POST /messages/:id/validate`
- [x] `PUT /messages/:id/read` (à corriger plus tard — voir backlog)
- [x] `GET/POST /discipline-reports`, `POST .../approve`
- [x] `GET /discipline`

### Reporting & divers
- [x] `GET /audit-logs`, `/stats/finance`, `/stats/pedagogy`
- [x] `GET/POST /library/books`

### Infra
- [x] Préfixe `/api/v1`, pagination, uploads `/uploads`, middlewares helmet/cors/rate-limit
- [x] Modèles Sequelize ~25 tables + Bulletin, AuditLog, RefreshToken

---

## B. Backlog 100 % backend — par module fonctionnel (FNC)

Légende : `[x]` fait (vital) · `[~]` partiel · `[ ]` manquant · **RG** = règle de gestion cahier des charges

---

### M1 — Authentification & Comptes

| FNC | Action backend | Statut | Notes |
|-----|----------------|--------|-------|
| FNC-01 | Login username/password | [x] | |
| FNC-02 | Forcer changement MDP 1ère connexion | [~] | `mustChangePassword` via préfixe `temp_` ; pas de champ BD |
| FNC-03 | Réinitialisation MDP par Root | [ ] | Pas `POST /auth/forgot-password` ni reset admin |
| FNC-04 | Profil (téléphone, email) | [~] | `PATCH /me` ou via PATCH personnel — à exposer proprement |
| FNC-05 | Créer compte Admin (types 0–5) | [x] | |
| FNC-06 | Créer compte Personne (E, Ad, P) | [x] | |
| FNC-07 | Envoyer code connexion via Messages | [~] | Route existe ; n’écrit pas dans `Messages` |
| FNC-08 | Activer/désactiver compte (`actif`) | [~] | Possible via PATCH générique ; pas d’endpoint dédié |
| FNC-09 | Suppression logique compte | [x] | `isDelete` admins/personnel |
| FNC-10 | Logout révocation refresh | [x] | |

**Tâches M1**
- [ ] `POST /auth/forgot-password` ou flow reset Root-only (doc à préciser)
- [ ] `PATCH /admins/:id/activate|deactivate`, idem personnel
- [ ] `POST /personnel/:id/send-credentials` → créer entrée `Messages` + audit
- [ ] `PATCH /me` (profil Personne/Admin)

---

### M2 — Gestion Académique

| FNC | Action | Statut | Notes |
|-----|--------|--------|-------|
| FNC-11 | CRUD années académiques | [~] | POST/GET ; pas PATCH/delete |
| FNC-12 | Définir année courante | [ ] | Flag ou convention sur `AnneeAcademique` |
| FNC-13 | CRUD trimestres | [~] | GET seul |
| FNC-14 | CRUD sessions | [~] | GET seul |
| FNC-15 | CRUD cycles | [~] | GET/POST/PATCH ; pas DELETE logique |
| FNC-16 | CRUD classes | [~] | idem |
| FNC-17 | CRUD salles | [~] | idem |
| FNC-18 | Inscrire élève (Eleve) | [x] | |
| FNC-19 | Affecter salle (Frequente) | [x] | |
| FNC-20 | Liste élèves par salle/classe/année | [x] | Filtre `?salle=` |
| FNC-21 | Désactiver élève sortant (`actif=0`) | [~] | Via PATCH student |
| FNC-22 | Référentiel villes naissance | [~] | GET ; pas POST |
| FNC-23 | Référentiel quartiers | [ ] | Modèle + routes absents |
| FNC-24 | Residents (personne ↔ quartier) | [ ] | Modèle + routes absents |

**Tâches M2**
- [ ] `POST/PATCH/DELETE` trimestres, sessions (RBAC Root)
- [ ] `PATCH /academic-years/:id` + endpoint « set current year »
- [ ] `POST /villes`, `GET/POST /quartiers`, `GET/POST /residents`
- [ ] DELETE logique cycles/classes/salles
- [ ] Filtres élèves : `?classe=`, `?idAcademi=`, `?annee=`

---

### M3 — Gestion Pédagogique

| FNC | Action | Statut | Notes |
|-----|--------|--------|-------|
| FNC-25 | CRUD cours | [~] | GET seul |
| FNC-26 | Associer cours à classe | [~] | Via POST cours (à créer) |
| FNC-27 | Affecter enseignant à cours | [~] | Table `Enseignant` ; pas de route CRUD |
| FNC-28 | Nommer titulaire de salle | [ ] | Table `Titulaire` non modélisée |
| FNC-29 | CRUD emploi du temps | [~] | GET ; pas POST |
| FNC-30 | Consulter EDT classe | [x] | |
| FNC-31 | EDT personnel (E, P) | [~] | E : `/schedules/my` ; P : **manquant** (enfant → salle → EDT) |

**Tâches M3**
- [ ] `POST/PATCH/DELETE /courses`
- [ ] `GET/POST/DELETE /enseignants` (affectations)
- [ ] Modèle + routes `Titulaire`
- [ ] `POST/PATCH/DELETE /schedules` (EmploiDuTemps)
- [ ] `GET /students/:matricule/schedule` (parent)

---

### M4 — Évaluations & Bulletins

| FNC | Action | Statut | Notes |
|-----|--------|--------|-------|
| FNC-32 | CRUD nature épreuve | [~] | GET ; pas POST |
| FNC-33 | Téléverser épreuve | [x] | multipart |
| FNC-34 | Saisie notes épreuve/classe | [x] | bulk |
| FNC-35 | Modifier note avant publication | [x] | PATCH ; pas de garde « bulletin publié » |
| FNC-36 | Appréciation par élève | [~] | Champ `appreciation` en Evaluation ; pas endpoint dédié |
| FNC-37 | Moyenne par cours/session | [x] | `lib/averages.ts` (usage interne) |
| FNC-38 | Moyenne trimestrielle | [x] | |
| FNC-39 | Rang dans salle | [x] | |
| FNC-40 | Générer bulletin PDF | [ ] | Seulement enregistrement `Bulletin` |
| FNC-41 | Valider/signer bulletin (D) | [x] | `POST .../validate` |
| FNC-42 | Publier bulletins (parents) | [~] | `valide=1` ; pas PDF ni endpoint publish |
| FNC-43 | Parent télécharge bulletin | [~] | JSON OK ; **PDF manquant** |
| FNC-44 | Télécharger épreuve selon nature | [~] | **RG-08/09 non appliqués** sur `/exams/:id/file` |

**Tâches M4**
- [ ] `POST /natures-epreuve` (Root)
- [ ] **RG-15** : vérifier `Enseignant` avant saisie/modif notes
- [ ] **RG-08/09** : filtre nature sur download épreuve (parent)
- [ ] `GET /bulletins/:matricule/:trimestre.pdf` (PDFKit, modèle doc §10.2)
- [ ] Endpoint « publish » trimestre (si distinct de validate)
- [ ] Bloquer PATCH note si bulletin validé/publié
- [ ] Exposer `GET /students/:matricule/averages?trimestre=&session=`

---

### M5 — Scolarité & Paiements

| FNC | Action | Statut | Notes |
|-----|--------|--------|-------|
| FNC-45 | Définir scolarité par cycle | [x] | POST/GET tuitions |
| FNC-46 | Tranches et montants | [x] | |
| FNC-47 | Modes de paiement | [x] | |
| FNC-48 | Enregistrer paiement | [x] | |
| FNC-49 | Upload justificatif | [x] | |
| FNC-50 | Reçu PDF | [x] | basique |
| FNC-51 | Historique paiements élève | [x] | |
| FNC-52 | Liste retards par tranche | [~] | Logique « aucun paiement année » |
| FNC-53 | Relances type 2 | [x] | |
| FNC-54 | Récap financier période | [~] | `stats/finance` minimal |

**Tâches M5**
- [ ] **RG-12** : refuser paiement si total > scolarité cycle
- [ ] **RG-11** : annulation tracée (écriture inverse, pas UPDATE)
- [ ] `GET /payments/overdue?tranche=&idAca=` (par tranche due)
- [ ] `GET /students/:matricule/tuition-status` (tranches payées/dues/retard)
- [ ] `PATCH` tuitions, tranches, modes (Fondateur)
- [ ] Enrichir `stats/finance` (jour/semaine/mois/trimestre, par mode)
- [ ] Reçu PDF enrichi (modèle doc §10.3)

---

### M6 — Communication

| FNC | Action | Statut | Notes |
|-----|--------|--------|-------|
| FNC-55 | Message individuel parent | [x] | |
| FNC-56 | Message tous parents (type 1) | [x] | `valider=0` |
| FNC-57 | Relance paiement type 2 | [x] | |
| FNC-58 | Message parent → école | [~] | POST messages sans distinction flux entrant |
| FNC-59 | Valider message collectif (D) | [x] | |
| FNC-60 | Boîte réception | [x] | |
| FNC-61 | Marquer lu/non lu | [~] | **Bug** : réutilise `valider` |
| FNC-62 | Recherche messages | [~] | `?search=` sur objet seulement |

**Tâches M6**
- [ ] Champ `lu` ou table dédiée ; `PUT /messages/:id/read` correct
- [ ] **RG-13** : bloquer envoi effectif type 1 tant que `valider≠1`
- [ ] Filtres : date, expéditeur, type_message
- [ ] Endpoint messages « administration » depuis parent (FNC-58)

---

### M7 — Discipline

| FNC | Action | Statut | Notes |
|-----|--------|--------|-------|
| FNC-63 | CRUD référentiel Discipline | [~] | GET ; pas POST |
| FNC-64 | Saisir rapport | [x] | |
| FNC-65 | Cumul points par élève/trimestre | [ ] | Calcul + endpoint |
| FNC-66 | Valider rapport grave (D) | [~] | Approve commentaire ; pas seuil points |
| FNC-67 | Parent consulte dossier enfant | [x] | via student discipline |

**Tâches M7**
- [ ] `POST/PATCH /discipline` (référentiel fautes, Root)
- [ ] `GET /students/:matricule/discipline/summary?trimestre=` (cumul points)
- [ ] Seuil configurable + file d’attente `GET /discipline-reports/pending-approval` (D)

---

### M8 — Documents & Médias

| FNC | Action | Statut | Notes |
|-----|--------|--------|-------|
| FNC-68 | Téléverser livre bibliothèque | [~] | POST métadonnées ; pas fichier |
| FNC-69 | Catalogue livres | [x] | |
| FNC-70 | Photo élève | [x] | |
| FNC-71 | Justificatif paiement | [x] | |
| FNC-72 | Limite 10 Mo | [x] | multer |
| FNC-73 | Scan antivirus upload | [ ] | Optionnel / v2 |

**Tâches M8**
- [ ] Upload fichier livre (PDF) + `GET /library/books/:id/file`
- [ ] Route sécurisée `/files/:id` (doc §9.2) au lieu de static `/uploads` direct
- [ ] Homework upload distinct (`/teacher/homework` → endpoint dédié si besoin)

---

### M9 — Reporting & Tableaux de bord

| FNC | Action | Statut | Notes |
|-----|--------|--------|-------|
| FNC-74 | Dashboard Root | [~] | Pas endpoint dédié ; agréger stats |
| FNC-75 | Dashboard Fondateur | [~] | `stats/finance` partiel |
| FNC-76 | Dashboard Directeur | [~] | `stats/pedagogy` partiel |
| FNC-77 | Dashboard Scolarité | [~] | idem |
| FNC-78 | Dashboard Enseignant | [ ] | « mes classes, notes à saisir » |
| FNC-79 | Dashboard Parent | [ ] | synthèse multi-enfants |
| FNC-80 | Export PDF/CSV | [ ] | |
| FNC-81 | Filtres temporels | [~] | partiel sur finance |
| FNC-82 | Stats démographiques | [ ] | genre, langue, ville |

**Tâches M9**
- [ ] `GET /stats/dashboard/:role` ou endpoints par rôle
- [ ] `GET /stats/demographics`
- [ ] `GET /exports/:resource?format=csv|pdf` (R, F, D, S, Au)
- [ ] Performance par classe/cours/élève (directeur)

---

### M10 — Audit & Logs

| FNC | Action | Statut | Notes |
|-----|--------|--------|-------|
| FNC-83 | Journaliser écritures sensibles | [~] | `logAudit` partiel (pas toutes routes) |
| FNC-84 | Consulter logs (R, Au) | [x] | |
| FNC-85 | Export logs | [ ] | |
| FNC-86 | (si présent doc) rétention / alertes | [ ] | Winston configuré ; pas d’alerting |

**Tâches M10**
- [ ] Audit sur **toutes** mutations (payments, notes, comptes, etc.)
- [ ] `GET /audit-logs/export?format=csv`
- [ ] Middleware audit générique

---

## C. Règles de gestion — checklist implémentation

| RG | Règle | Backend actuel |
|----|--------|----------------|
| RG-01 | Comptes créés par Root seul | [x] |
| RG-02 | MDP initial via Messages | [ ] |
| RG-03 | Changement MDP 1ère connexion | [~] |
| RG-04 | 1 salle / élève / année (Frequente) | [~] pas de contrainte anti-doublon |
| RG-05 | 1 salle → 1 classe | BD |
| RG-06 | Parents multi-enfants | [x] |
| RG-07 | Parent voit ses enfants seulement | [x] |
| RG-08 | Examens non téléchargeables parents | [ ] |
| RG-09 | Devoirs téléchargeables parents | [ ] |
| RG-10 | Bulletin parent si validé D | [x] JSON ; PDF [ ] |
| RG-11 | Paiement immuable | [~] pas d’update ; pas d’annulation tracée |
| RG-12 | Total paiements ≤ scolarité | [ ] |
| RG-13 | Message type 1 → validation D | [~] |
| RG-14 | Suppression logique | [x] partiel |
| RG-15 | Notes seulement cours de l’enseignant | [ ] |
| RG-16 | Moyenne pondérée coefficients | [x] |
| RG-17 | Rang sur moyenne trimestrielle | [x] |

---

## D. Dette technique & architecture (post-frontend ou phase 2)

- [ ] Découper `routes/api.ts` en modules (`modules/students/`, etc.) — doc §3.1
- [ ] Validation Zod sur tous les body (`@ecole/shared/schemas`)
- [ ] Corriger doublon `GET /schedules/my` (déclaré 2×)
- [ ] Tests : couverture 60–70 % routes critiques (Supertest + BD test)
- [ ] `POST /auth/login` rate limit 5/10min (doc OWASP ; actuellement 50)
- [ ] i18n erreurs API (optionnel)

---

## E. Préparation frontend (prochaine étape — hors scope backend)

Structure `apps/web` existante :
- `src/app/` router, layouts, navigation
- `src/features/*` par domaine
- `src/pages/`, `src/shared/`

**Client API** : `VITE_API_URL` → `/api/v1`, Bearer depuis Zustand auth store.

**Mapping rôles → préfixes routes front** (doc + `ROLE_DASHBOARD` shared) :
`/root`, `/admin`, `/staff`, `/scolarite`, `/fondateur`, `/directeur`, `/auditeur`, `/teacher`, `/parent`

**Priorité branchement front sur API gelée** :
1. Auth (login, refresh, change-password, guards)
2. Layout + menu par rôle
3. Listes lecture : students, payments, messages, academic refs
4. Flux métier : saisie paiement, saisie notes, validation directeur (si pages prévues)

---

## F. Résumé quantitatif

| Catégorie | Comptage |
|-----------|----------|
| FNC totales (catalogue) | 86 |
| Vitales OK pour front | ~45 endpoints / flux principaux |
| Partielles `[~]` | ~25 |
| Manquantes `[ ]` | ~20 + RG non implémentées |

**Ordre suggéré quand le backend reprendra** (après phase front) :
1. PDF bulletins + download épreuves RG-08/09 (critères soutenance)
2. Retards par tranche + statut scolarité élève
3. RG-15 notes enseignant
4. CRUD trimestres/sessions/cours/EDT
5. M6 messages « lu » + credentials Messages
6. Exports & dashboards
7. Quartiers/Residents/Titulaire