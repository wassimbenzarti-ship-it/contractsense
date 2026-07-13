# CLAUDE.md — Mémoire partagée contractsense (frontend)

> **LIS CE FICHIER EN ENTIER AVANT DE MODIFIER app-v2.html.**

---

## Règles de travail obligatoires

### Avant chaque session
```bash
git fetch origin
git checkout dev          # branche de travail UNIQUE
git pull origin dev
```

### Ne JAMAIS faire
- Pousser directement sur `main` — **sauf pour les articles SEO** (nouveaux fichiers `*.html` de blog + `sitemap.xml` uniquement) qui sont publiés en continu par la routine hebdomadaire avec autorisation permanente de l'utilisateur
- Créer une nouvelle branche feature — tout va sur `dev`
- Modifier `index.html` sans ordre explicite (c'est la landing page commerciale)
- Utiliser `Write` sur `app-v2.html` entier — utiliser uniquement `Edit` ciblé

### Toujours faire
- Travailler sur `dev`, tester, puis demander confirmation avant de merger sur `main`
- Commiter avec un message descriptif

---

## Architecture du repo

### Branches
| Branche | Rôle |
|---------|------|
| `dev` | Branche de travail des agents — toujours utiliser celle-ci |
| `main` | Production — GitHub Pages déploie depuis `main` → `ai.westfieldavocats.com` |

### Workflow
```
agents → poussent sur dev → utilisateur teste → valide → merge dev→main → déploiement auto
```

---

## Fichiers du repo — À CONNAÎTRE ABSOLUMENT

| Fichier | Rôle | Modifier ? |
|---------|------|-----------|
| `app-v2.html` | **Application principale** (190KB) — espace utilisateur, analyse de contrats | OUI, c'est le fichier de travail principal |
| `index.html` | **Landing page commerciale** (113KB) — page d'accueil `ai.westfieldavocats.com` | JAMAIS sans ordre explicite |
| `admin.html` | Panneau administration (52KB) | Seulement si la tâche concerne l'admin |
| `CNAME` | Pointe vers `ai.westfieldavocats.com` | Ne pas toucher |
| `sitemap.xml`, `robots.txt` | SEO | Seulement si tâche SEO explicite |
| `*.html` de blog | `ia-cabinet-avocat-maroc.html`, `negociation-*.html` etc. | Seulement si tâche contenu explicite |

### Fichiers supprimés (archives — ne pas recréer)
Tous les `contractsense_N.html`, `admin_N.html`, `app.html`, `appooo.html`, `indexold.html` ont été supprimés le 2026-04-15. Ce sont des brouillons obsolètes.

---

## Architecture de app-v2.html

### Stack
- Fichier HTML unique (vanilla JS, pas de framework)
- Appelle le backend Flask sur Railway (`contractsense-backend`)
- GitHub Pages sert depuis `main` → `ai.westfieldavocats.com`

### Flux principal
```
1. Upload DOCX → POST /identify-parties → renderParties()
2. Sélection partie → POST /analyze → renderCompliance() + _renderReviewJuristeBar()
3. Révision → Export DOCX (POST /export)
```

### Variables globales critiques
| Variable | Rôle |
|----------|------|
| `_userRole` | Rôle de l'utilisateur (`juriste`, `directeur`, ou null) |
| `_isAdmin` | Booléen admin |
| `_dashAnalysis` | `true` si l'analyse vient du dashboard (pas du flow home) |
| `modifications` | Array des modifications JSON retournées par le backend |
| `window._allContractClauses` | Clauses extraites du contrat (pour le dropdown "ajouter une clause") |

### Fonctions critiques
| Fonction | Rôle |
|----------|------|
| `renderParties(parties)` | Affiche les parties (utilise `_buildPartiesUI`) |
| `_buildPartiesUI(listEl, parties, onConfirm)` | Logique partagée de sélection/coalition |
| `analyzeWithPartie(partieName)` | Lance l'analyse POST /analyze |
| `renderCompliance()` | Affiche les modifications après analyse |
| `_renderReviewJuristeBar(targetId?)` | Barre "extension d'analyse" — visible pour tous les rôles |
| `_extractContractClauses(text)` | Parse le texte du contrat pour extraire les clauses |

### Sections HTML principales
| ID | Rôle |
|----|------|
| `step-upload` | Étape 1 : upload du contrat |
| `step-parties` | Étape 2 : sélection de la partie |
| `step-loading` | Loader pendant l'analyse |
| `step-review` | Étape 3 : révision des modifications (flow home) |
| `review-juriste-bar` | Barre d'extension — créée dynamiquement avant `.export-section` |
| `d-ana-review` | Révision dans le dashboard |
| `d-review-juriste-bar` | Barre d'extension dans le dashboard |

### Système de rôles
```
juriste    → voit "Soumettre au directeur →"
directeur  → voit "Valider → RAG" + "Renvoyer au juriste"
admin      → voit "Valider → RAG" + "Renvoyer au juriste"
solo/null  → voit "Valider → RAG"
```

---

## Backend associé
Le backend est dans le repo `contractsense-backend` (Flask, Railway).
URL de production : voir variable `API_BASE` dans `app-v2.html`.
Ne pas changer l'URL du backend sans vérifier que Railway a bien déployé.

---

## Historique des incidents

| Date | Problème | Fix |
|------|----------|-----|
| 2026-04-15 | Conflits de merge entre branches feature parallèles | Migration vers workflow dev/main unique |
| 2026-04-15 | "Analyse étendue" absente dans dashboard | `_dashAnalysis` court-circuitait `_renderReviewJuristeBar()` — corrigé |
| 2026-04-15 | `_rag_coverage` garbled en production | Backend pas déployé avec le fix UTF-8 — corrigé via merge main |
