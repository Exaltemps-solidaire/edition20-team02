# Déploiement

Site pour l'association Imagine for Margo (lutte contre le cancer pédiatrique) : une homepage qui oriente chacun des quatre publics prioritaires (entreprise mécène, particulier, testateur, organisateur) vers son propre parcours.

## Services

- `frontend/` : export statique Next.js servi par nginx, port 80 du conteneur (8080 publié). **Service exposé au public.**
- `api/` : serveur Node minimal, port 8081 du conteneur (8081 publié). Sert pour l'instant `/health` et `/sante` uniquement, sans route métier.

## Services externes

Aucun pour l'instant : pas de base de données, pas de stockage, pas d'appel IA.

## Fragile / inachevé

- Seule la card « Organisateur » mène à une page dédiée ; les 3 autres cards restent sans navigation.
- Sur la page Organisateur, aucun bouton n'est fonctionnel (pas de téléchargement, de formulaire ou de contact réel) : contenu en dur, repris du prototype.
- Les pages dédiées Entreprise, Particulier, Testateur, l'écran « Qui êtes-vous ? » et l'API métier ne sont pas encore construits.
- Le `nginx.conf` du front ne porte pas encore les en-têtes de sécurité du gabarit de la plateforme (`templates/nginx.conf`) : à reprendre quand le front aura plusieurs routes à gérer en repli SPA.

## Contact

Équipe 02, hackathon eXaltemps Solidaire.
