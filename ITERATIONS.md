# Plan d'itérations — Imagine for Margo (équipe R5PGK5)

**Plan validé le 2026-11-18.**

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation — ni fichier `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`).
- **Temps restant annoncé** : 10 à 15 minutes jusqu'à la fin du build (annoncé le 2026-11-18, après révision d'une première estimation de 5 minutes).
- **Durée du tour de test de l'équipe** : 10 minutes (valeur par défaut, confirmée par le développeur).
- **Temps restant au début de l'itération 1** : 10 minutes (annoncé par le développeur). ✂️ Réduction du périmètre : publication ~5 min laisse ~5 min de codage, pas 7 ; homepage simplifiée (4 cards avec les bons libellés, mise en forme minimale) plutôt que reproduction fidèle du prototype. Repli si dépassement : publier le squelette seul (gabarit par défaut) avec `/health`/`/sante` fonctionnels.

## ✂️ Le périmètre ne tient pas — ce qui sort

Une itération dure au moins : codage + publication (~5 min) + tour de test (10 min). Avec 10 à 15 minutes de build restantes, **une seule itération tient dans ce build**, et seulement si le tour de test de l'équipe a lieu après la fin du build (il n'y a pas de seconde itération à préparer derrière).

Sortent donc du périmètre de ce build, reportés en « À venir » sans garantie d'être atteints aujourd'hui :
- l'écran « Qui êtes-vous ? » (sélection de persona) ;
- la page dédiée Organisateur – Action solidaire, et son contenu ;
- les pages Entreprise mécène, Particulier, Testateur – Legs & donation ;
- la navigation entre la homepage et une page dédiée ;
- toute mesure (0 détour, 0 clic menu).

## Itération 1 : le squelette est déployé et montre la homepage avec ses 4 cards par public, en dur

- **Dans le périmètre** :
  - `.env.example` et `DEPLOIEMENT.md` à la racine, pour le contrat de déployabilité ;
  - `frontend/src/app/page.tsx` : remplace le gabarit Next.js par l'écran principal du prototype — 4 cards par public (Entreprise mécène, Particulier, Testateur – Legs & donation, Organisateur – Action solidaire), libellés et charte repris de `passation/prototype/index.html` ;
  - vérification que `/health` et `/sante` répondent côté front (8080) et côté API (8081, déjà en place dans `api/src/routes.ts`).
- **Hors périmètre** : clic sur une card (aucune navigation), écran de choix de persona, contenu des pages dédiées, toute logique API.
- **Critères d'acceptation** :
  - Étant donné l'application déployée, quand on ouvre `/`, alors les 4 cards par public s'affichent avec leurs libellés exacts.
  - Étant donné l'application déployée, quand on interroge `/health` et `/sante` sur le port 8080 et sur le port 8081, alors chacune répond 200.
  - Étant donné le contrat de déployabilité, quand on exécute `./scripts/verifier-deployabilite.sh`, alors aucune borne n'est signalée.
- **Hypothèse de l'équipe couverte** : aucune directement — l'hypothèse « 0 détour / 0 clic menu » suppose un clic vers la page dédiée, hors périmètre de cette itération. Cette itération pose la fondation visuelle qui permettra de la mesurer à l'itération suivante.
- **Codage estimé** : 7 minutes.
- **Fichiers prévus** : `.env.example`, `DEPLOIEMENT.md`, `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`.
- **Tests unitaires prévus** : aucun nouveau — pas de logique métier nouvelle (cards statiques, pur balisage). Les tests existants (`api/src/routes.test.ts`) doivent continuer de passer.
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouvrir la homepage, vérifier la présence des 4 cards.
- **Bilan** :
  - **Codage** : ~2 minutes, pas de dépassement (budget 8 min non atteint).
  - **Critères d'acceptation** : les 3 satisfaits — 4 cards affichées avec libellés exacts du prototype (`Entreprise mécène`, `Particulier`, `Testateur · Legs`, `Organisateur`) ; `/health` et `/sante` répondent 200 sur 8080 et 8081 (vérifié par `curl` depuis la machine) ; `./scripts/verifier-deployabilite.sh` ne signale aucune borne.
  - **Bloqué/refusé par le harnais** : rien — `npm test` passe (suite racine 2/2, suite frontend sans test métier nouveau), le contrat de déployabilité est propre, `./scripts/signaler-version.sh 1` a été accepté du premier coup.
  - **Incident hors code** : le premier démarrage de la plateforme (`gitlab-ci-local --force-shell-executor`) a échoué à cause du rate-limit anonyme de Docker Hub (images `registry:2` et `pgvector/pgvector:pg17` jamais tirées) ; un second lancement, idempotent, a réussi entièrement.
  - **Reporté** : tout ce qui est listé en « À venir » ci-dessous, inchangé — navigation depuis les cards, écran de choix de persona, pages dédiées, contenu réel.
  - **Démo (hors DoD)** : étape « Je vois les 4 cards par public » ajoutée à `e2e/demo.spec.ts`. `npm run demo` échoue dans cet environnement (Chromium installé via `playwright install chromium`, mais lib système manquante : `libnspr4.so`) — signalé, non bloquant.
  - **Modifications** :
    - `.env.example` — critère 3 (contrat de déployabilité : variables documentées).
    - `DEPLOIEMENT.md` — critère 3 (doc une page du contrat).
    - `api/Dockerfile`, `frontend/Dockerfile` — critères 1 et 2 (images qualifiées `docker.io/library/...`, condition du déploiement serveur).
    - `podman-compose.yml` — critères 1 et 2 (publication 8080/8081 sur `core-network`).
    - `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css` — critère 1 (4 cards, libellés du prototype).
    - `frontend/src/app/layout.tsx` — critère 1 (titre/langue cohérents avec la homepage réelle, corrigé après déploiement).
    - `e2e/demo.spec.ts` — démo (hors DoD), étape des 4 cards.

## À venir

1. Page dédiée Organisateur – Action solidaire, accessible depuis sa card (clic → navigation), contenu en dur.
2. Écran « Qui êtes-vous ? » (sélection de persona, un par rôle du scénario), avec bouton pour en changer.
3. Pages dédiées Entreprise mécène, Particulier, Testateur – Legs & donation, sur le même modèle que la page Organisateur.
4. Contenu réel des pages dédiées (informations, kit, action de contact/téléchargement) à la place du contenu en dur.

⚠️ Avec 10 à 15 minutes, même l'itération 1 est tendue : 7 minutes de codage + ~5 minutes de publication consomment presque tout le budget, sans marge si la publication (build/push des deux images, redémarrage des conteneurs) traîne. Si ça dérape, la priorité est de publier un résultat qui répond sur `/health` et `/sante`, quitte à garder le gabarit Next.js par défaut sur `/` et reporter les 4 cards à une itération suivante.
