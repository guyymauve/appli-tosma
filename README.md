# appli-tosma
***
Appli web en React et Serveur en Node.js pour l'implémentation du tosma Hyris (système d'emprunt de matos).

## Installation
Ce projet est une version de test et n'a pas encore vocation a être déployé. Si jamais vous voulez le tester, suivez la procédure suivante.

1. Clonez-le depot GitHub
2. Dans un terminal déplacez vous dans appli-tosma/api
3. Entrez "npm run serverstart" pour lancer le serveur
4. Dans un autre terminal, déplacez vous dans appli-tosma/client
5. Entrez "npm start" pour lancer le client web

Dans cette version, les serveur est hébergé en local sur le port 8000 et le client web sur le port 3000. Les données sont stockées sur une BDD MongoDB Atlas.

## Utilisation
### Se noter sur le tosma
Pour se noter sur le tosma, il faut rentrer un nom dans le champ en haut de la page, puis cliquer sur le matos à emprunter/rendre. Il faut obligatoirement un nom, même pour rendre le matos.
## Modifier le matos
Il faut cliquer sur le bouton "Modifier le matos" en haut de l'écran. Il faut ensuite rentrer le mot de passe pour accéder à l'interface admin (par défaut 2BDindes). Ensuite il faut utiliser l'un des 3 formulaires pour ajouter/modifier/supprimer du matos.

## A faire
1. Faire une authentification sécurisée (avec des user token)
2. Sécuriser l'accès à la base de données
3. Nettoyer un peu le code et ajouter de la gestion d'exceptions
4. Avoir une jolie interface