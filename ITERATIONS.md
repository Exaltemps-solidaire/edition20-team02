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

## Itération 2 : la card Organisateur mène à sa page dédiée

- **Temps restant au début de l'itération 2** : 15 minutes (annoncé par le développeur). Codage + publication (~5 min) doivent tenir dans ce budget ; le tour de test de l'équipe (10 min) a lieu après la fin du build — pas de 3ᵉ itération prévue derrière, sauf si le développeur annonce du temps en plus à la clôture.
- **Dans le périmètre** :
  - `frontend/src/app/organisateur/page.tsx` + `page.module.css` : page dédiée reprenant le contenu de `screen-5` du prototype (hero, 2 stats, 3 cartes d'action, bloc CTA) — texte en dur, aucun bouton n'est fonctionnel (pas de téléchargement, pas de formulaire, pas de contact réel) ;
  - `frontend/src/app/page.tsx` : la card « Organisateur » devient un lien (`next/link`) vers `/organisateur` ; les 3 autres cards restent non cliquables ;
  - un bouton ou lien de retour vers `/` sur la page dédiée.
- **Hors périmètre** : les 3 autres pages dédiées, l'écran de choix de persona, toute action réelle (téléchargement, déclaration, contact), mesure du nombre de clics.
- **Critères d'acceptation** :
  - Étant donné la homepage, quand on clique sur la card « Organisateur », alors on arrive sur `/organisateur` et son contenu (hero + stats + 3 actions + CTA) s'affiche.
  - Étant donné la page `/organisateur`, quand on clique sur le bouton retour, alors on revient à `/`.
  - Étant donné le contrat de déployabilité, quand on exécute `./scripts/verifier-deployabilite.sh`, alors aucune borne n'est signalée.
- **Hypothèse de l'équipe couverte** : « 0 détour / 0 clic menu » (partiellement) — un seul clic depuis la homepage mène au contenu Organisateur ; la mesure réelle (temps, clics) reste hors périmètre.
- **Codage estimé** : 6 minutes.
- **Fichiers prévus** : `frontend/src/app/organisateur/page.tsx`, `frontend/src/app/organisateur/page.module.css`, `frontend/src/app/page.tsx` (card → lien), `frontend/src/app/page.module.css` (style du lien si besoin).
- **Tests unitaires prévus** : aucun nouveau — navigation et balisage purs, pas de logique métier (calcul, validation, transformation). Les tests existants doivent continuer de passer.
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : cliquer sur la card Organisateur, vérifier le contenu de la page dédiée, cliquer sur retour, vérifier qu'on est de nouveau sur `/`.
- **Bilan** :
  - **Codage** : ~1 minute, aucun dépassement.
  - **Critères d'acceptation** : les 3 satisfaits — clic sur la card Organisateur → `/organisateur` affiche hero, 2 stats, 3 actions et bloc CTA ; le lien « ← Retour » ramène à `/` ; `./scripts/verifier-deployabilite.sh` ne signale aucune borne.
  - **Bloqué/refusé par le harnais** : rien — `npm test` passe (routes API inchangées, aucun test frontend requis), `./scripts/signaler-version.sh 2` accepté du premier coup.
  - **Reporté** : inchangé — écran de choix de persona, pages Entreprise/Particulier/Testateur, actions réelles (téléchargement, déclaration, contact) sur la page Organisateur.
  - **Démo (hors DoD)** : 2 étapes ajoutées (clic sur la card, retour). `npm run demo` reste non exécutable dans cet environnement (lib système `libnspr4.so` manquante pour Chromium) — signalé à nouveau, non bloquant.
  - **Modifications** :
    - `frontend/src/app/organisateur/page.tsx`, `frontend/src/app/organisateur/page.module.css` — critère 1 (contenu de la page dédiée).
    - `frontend/src/app/page.tsx` — critères 1 et 2 (card Organisateur devient un lien `next/link`).
    - `DEPLOIEMENT.md` — tenue à jour du contrat de déployabilité (section fragile/inachevé).
    - `e2e/demo.spec.ts` — démo (hors DoD), étapes clic + retour.

## Itération 3 : la homepage reprend l'identité visuelle du prototype

⚠️ **Changement de priorité, demandé par le développeur** : l'équipe produit, en testant la version 2, ne reconnaissait pas la homepage comme la bonne version — la mise en forme minimale de l'itération 1 (assumée alors par manque de temps) est visuellement trop éloignée du prototype pour qu'ils s'y retrouvent. Cette itération passe donc devant « rendre les 3 autres cards cliquables », reportée en « À venir ». À valider par les cadreurs au prochain tour de test.

- **Temps restant au début de l'itération 3** : 20 minutes (annoncé par le développeur).
- **Dans le périmètre** :
  - gabarit mobile centré (largeur max 420px, fond `#c8d8e8` autour), police Poppins (Google Fonts) ;
  - header avec le logo SVG « papillon » et le nom « Imagine for Margo », repris tels quels du prototype ;
  - bandeau hero (accroche, titre, sous-titre) au style du prototype ;
  - restyle des 4 cards publics : barre d'accent, ligne libellé + flèche, titre, description — au plus près de `.public-card`/`.card-*` du prototype ;
  - le lien de la card Organisateur vers `/organisateur` est conservé.
- **Hors périmètre** : carrousel interactif, onglets de nav secondaire, bouton « Je donne », bandeau footer « 100 % des dons », restyle de la page `/organisateur` (reporté).
- **Critères d'acceptation** :
  - Étant donné la homepage, quand on l'ouvre, alors elle s'affiche dans un cadre mobile centré (max 420px) avec le header logo + nom et la police Poppins.
  - Étant donné la homepage, quand on regarde les 4 cards, alors leur style (barre d'accent, libellé + flèche, titre, description) correspond à celui du prototype.
  - Étant donné le contrat de déployabilité, quand on exécute `./scripts/verifier-deployabilite.sh`, alors aucune borne n'est signalée.
- **Hypothèse de l'équipe couverte** : aucune directement — lève un blocage de reconnaissance produit, condition pour que les hypothèses soient testables du tout.
- **Codage estimé** : 9 minutes.
- **Fichiers prévus** : `frontend/src/app/layout.tsx` (police Poppins), `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`, `frontend/src/app/globals.css` (fond hors cadre).
- **Tests unitaires prévus** : aucun nouveau — restyle et balisage purs, pas de logique métier.
- **Étapes ajoutées à la démo** : aucune (pas de nouveau parcours, juste un restyle).
- **Bilan** :
  - **Codage** : ~2 minutes, aucun dépassement.
  - **Critères d'acceptation** : les 3 satisfaits — gabarit mobile (max 420px) avec header logo + « IMAGINE for Margo » et police Poppins ; cards restylées (barre d'accent, libellé + flèche, titre, description) avec les couleurs exactes du prototype par public ; `./scripts/verifier-deployabilite.sh` ne signale aucune borne. Repris aussi, en prime et à coût nul : la copie exacte du hero (tagline « Go · Fight · Win », titre, sous-titre) et du libellé de section, pour maximiser la reconnaissance par l'équipe produit.
  - **Bloqué/refusé par le harnais** : rien — `npm test` passe, `./scripts/signaler-version.sh 3` accepté du premier coup.
  - **Reporté** : carrousel, menu secondaire, bouton « Je donne », bandeau « 100 % des dons », restyle de la page Organisateur — inchangé, cf. « Hors périmètre ».
  - **Démo (hors DoD)** : aucune étape ajoutée (pas de nouveau parcours).
  - **Modifications** :
    - `frontend/src/app/layout.tsx` — critère 1 (police Poppins au lieu de Geist).
    - `frontend/src/app/globals.css` — critère 1 (fond hors cadre, suppression du mode sombre automatique qui cassait la charte).
    - `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css` — critères 1 et 2 (header, hero, cards au gabarit du prototype).
    - `DEPLOIEMENT.md` — tenue à jour du contrat de déployabilité.

## Itération 4 : la homepage s'adapte aux écrans larges (tablette, desktop)

⚠️ **Changement de priorité, demandé par le développeur** : le gabarit du prototype (et celui posé en itération 3) est pensé pour mobile uniquement (conteneur figé à 420px) ; sur un écran large, la page reste cantonnée à cette largeur. Passe devant « restyle de la page Organisateur » et « cards cliquables », reportés en « À venir ».

- **Temps restant au début de l'itération 4** : 20 minutes (annoncé par le développeur).
- **Dans le périmètre** :
  - le conteneur (`.screen`) ne garde la largeur fixe 420px qu'en dessous d'un breakpoint tablette (~600px) ; au-delà, il s'élargit (jusqu'à ~900px sur desktop) ;
  - header et bandeau hero s'étirent sur la largeur du conteneur élargi, sans changer de structure ;
  - la grille de cards passe d'une colonne (mobile) à 2 colonnes (tablette) puis plus (desktop), via CSS Grid + media queries ; le rendu en dessous de 600px reste identique à l'itération 3.
- **Hors périmètre** : responsive de la page `/organisateur` (reporté), carrousel, menu secondaire, bandeau dons.
- **Critères d'acceptation** :
  - Étant donné un viewport mobile (≤600px), quand on ouvre `/`, alors le rendu est identique à l'itération 3 (colonne unique, cards empilées, conteneur 420px).
  - Étant donné un viewport desktop (≥1024px), quand on ouvre `/`, alors le conteneur dépasse 420px et les 4 cards s'affichent sur plusieurs colonnes.
  - Étant donné le contrat de déployabilité, quand on exécute `./scripts/verifier-deployabilite.sh`, alors aucune borne n'est signalée.
- **Hypothèse de l'équipe couverte** : aucune directement — réponse à un retour produit sur l'accessibilité desktop de la démo.
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : `frontend/src/app/page.module.css` (media queries), `frontend/src/app/globals.css` (alignement du conteneur si besoin).
- **Tests unitaires prévus** : aucun nouveau — CSS/mise en page pur, pas de logique métier.
- **Étapes ajoutées à la démo** : aucune (pas de nouveau parcours).
- **Bilan** :
  - **Codage** : ~1 minute, aucun dépassement.
  - **Critères d'acceptation** : les 3 satisfaits — en dessous de 600px le rendu est inchangé (colonne unique, conteneur 420px) ; à partir de 1024px le conteneur passe à 960px et les cards s'affichent en grille multi-colonnes (`repeat(auto-fit, minmax(220px, 1fr))`) ; `./scripts/verifier-deployabilite.sh` ne signale aucune borne. Vérifié via le CSS déployé (`@media (min-width:600px)`/`(min-width:1024px)` présents dans les chunks servis).
  - **Bloqué/refusé par le harnais** : rien — `npm test` passe, `./scripts/signaler-version.sh 4` accepté du premier coup.
  - **Reporté** : responsive de la page Organisateur, cards cliquables restantes, restyle Organisateur — inchangé, cf. « Hors périmètre ».
  - **Démo (hors DoD)** : aucune étape ajoutée.
  - **Modifications** :
    - `frontend/src/app/page.module.css` — critères 1 et 2 (breakpoints 600px/1024px sur le conteneur et la grille de cards).

## Itération 5 : plus de bande latérale sur grand écran, sur les deux pages

⚠️ **Changement de priorité, demandé par le développeur** : le conteneur plafonné à 960px posé en itération 4 règle l'étirement excessif, mais recrée exactement le problème qu'on corrigeait — sur un ordinateur portable classique (1280px et plus), deux bandes de fond vides apparaissent de part et d'autre du conteneur. La cible par défaut est un ordinateur portable classique, sans bande visible quel que soit le moniteur. Le développeur a validé explicitement de retirer les limites de largeur plutôt que de les ajuster, et d'appliquer le traitement aux deux pages (homepage et Organisateur, qui n'avait jamais été traitée). Passe devant « cards cliquables » et « restyle Organisateur », reportés en « À venir ».

- **Temps restant au début de l'itération 5** : 20 minutes (annoncé par le développeur).
- **Dans le périmètre** :
  - homepage : le conteneur (`.screen`) et ses fonds (header, hero) s'étirent sur toute la largeur de la fenêtre, sans plafond de largeur ; le contenu qui a besoin d'être lisible (texte du hero, grille de cards) garde une largeur interne raisonnable, centrée ;
  - page Organisateur : même traitement — `.hero` et `.cta` (seuls blocs avec un fond de couleur propre, donc seuls responsables des bandes) s'étirent en plein fond, avec leur contenu capé et centré à l'intérieur ;
  - le rendu mobile (≤600px) ne change pas sur les deux pages.
- **Hors périmètre** : restyle de la page Organisateur au gabarit du prototype (reporté), cards cliquables restantes, carrousel, menu secondaire, bandeau dons.
- **Critères d'acceptation** :
  - Étant donné un viewport de largeur 1366px ou 1920px (ordinateur portable/moniteur courants), quand on ouvre `/` ou `/organisateur`, alors aucune bande de fond vide n'apparaît de part et d'autre du contenu.
  - Étant donné un viewport mobile (≤600px), quand on ouvre `/` ou `/organisateur`, alors le rendu est identique à avant cette itération.
  - Étant donné le contrat de déployabilité, quand on exécute `./scripts/verifier-deployabilite.sh`, alors aucune borne n'est signalée.
- **Hypothèse de l'équipe couverte** : aucune directement — réponse à un retour produit sur l'affichage desktop de la démo.
- **Codage estimé** : 9 minutes.
- **Fichiers prévus** : `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css`, `frontend/src/app/organisateur/page.tsx`, `frontend/src/app/organisateur/page.module.css`.
- **Tests unitaires prévus** : aucun nouveau — CSS/mise en page pur, pas de logique métier.
- **Étapes ajoutées à la démo** : aucune (pas de nouveau parcours).
- **Bilan** :
  - **Codage** : ~3 minutes, aucun dépassement.
  - **Critères d'acceptation** : les 3 satisfaits — le conteneur (`.screen` homepage, `.hero`/`.cta` Organisateur) n'a plus de plafond de largeur, le fond s'étire bord à bord et seul le contenu interne garde une largeur de lecture (1100px homepage, 600px pour les blocs hero/cta), vérifié dans le CSS déployé (plus de `max-width:420/700/960px` sur `.screen` ; `max-width:600px` sur les nouveaux `.heroInner`/`.ctaInner`) ; le rendu mobile (≤600px) est inchangé, aucune des règles mobiles existantes n'a été touchée ; `./scripts/verifier-deployabilite.sh` ne signale aucune borne.
  - **Bloqué/refusé par le harnais** : rien — `npm test` passe, `./scripts/signaler-version.sh 5` accepté du premier coup.
  - **Reporté** : cards cliquables restantes, restyle Organisateur au gabarit prototype — inchangé, cf. « Hors périmètre ».
  - ⚠️ **État trouvé en cours d'itération** : `frontend/src/app/page.module.css` portait déjà, avant cette itération, un ajout non committé (`headerTopRow`, `headerNav`, `navTab`, `activeTab`) pour une navigation secondaire par onglets — une fonctionnalité explicitement hors périmètre à l'itération 3, et non référencée dans `page.tsx`. Elle vient probablement d'une autre session du harnais ouverte en parallèle sur ce même dépôt. Elle a été laissée intacte (CSS mort, sans effet sur le rendu) plutôt que supprimée, pour ne pas écraser un travail en cours qui n'est pas le mien. À signaler aux cadreurs/à l'équipe : deux sessions semblent travailler sur le même fichier en même temps, risque de conflit au prochain commit de l'autre session.
  - **Démo (hors DoD)** : aucune étape ajoutée (pas de nouveau parcours).
  - **Modifications** :
    - `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css` — critères 1 et 2 (conteneur plein fond, contenu capé et centré, header/hero inchangés en dessous de 600px).
    - `frontend/src/app/organisateur/page.tsx`, `frontend/src/app/organisateur/page.module.css` — critères 1 et 2 (même traitement sur hero/cta).
    - `DEPLOIEMENT.md` — tenue à jour du contrat de déployabilité.

## À venir

1. Rendre les 3 autres cards (Entreprise, Particulier, Testateur) cliquables vers leurs pages dédiées, sur le modèle de la page Organisateur.
2. Restyle de la page Organisateur au gabarit du prototype (hero `.hero-organisateur`, stats, actions).
3. Écran « Qui êtes-vous ? » (sélection de persona, un par rôle du scénario), avec bouton pour en changer.
4. Pages dédiées Entreprise mécène, Particulier, Testateur – Legs & donation, sur le même modèle que la page Organisateur.
5. Contenu réel et actions fonctionnelles des pages dédiées (téléchargement de kit, déclaration d'action, contact) à la place des boutons non fonctionnels.

⚠️ Avec 20 minutes annoncées, 9 minutes de codage + ~5 minutes de publication laissent peu de marge pour une 2ᵉ itération derrière celle-ci dans ce build sauf temps additionnel annoncé à la clôture. Repli en cas de dépassement : publier la homepage seule, quitte à reporter le traitement de la page Organisateur à l'itération suivante.
