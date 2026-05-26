# EcoleApp 2026

Application de gestion d'�cole primaire bilingue � conforme � la documentation technique v1.0.

## Stack

- **Frontend** : React 18, Vite 5, TypeScript, TailwindCSS, TanStack Query, Zustand, react-i18next, Recharts
- **Backend** : Node.js 20, Express 4, TypeScript, Sequelize 6, JWT, Zod, Winston, Helmet, Multer, PDFKit
- **Base** : MySQL 8.0 (`ecole2026`)


## D�marrage

```bash
cd ecole-app
npm install
npm run dev -w @ecole/api   # http://localhost:4000
npm run dev -w @ecole/web   # http://localhost:5173
```

Ou les deux : `npm run dev` (depuis la racine, si `concurrently` install�).

## Connexion

| Utilisateur | Mot de passe |
|-------------|--------------|
| `root` | `admin123` |

Comptes existants en BD : `admin`, `directeur`, `scolarite`, `user1`� (mots de passe d'origine).

## Structure

```
ecole-app/
??? apps/api/          # API REST /api/v1
??? apps/web/          # SPA React (97 vues rout�es)
??? packages/shared/   # R�les, sch�mas Zod partag�s
```

## Routes principales

- `/login`, `/forgot-password`, `/change-password`
- `/root/*`, `/admin/*`, `/scolarite/*`, `/fondateur/*`, `/directeur/*`
- `/auditeur/*`, `/teacher/*`, `/parent/*`, `/staff/*`

Voir `apps/web/src/app/router.tsx` pour l'inventaire complet.
