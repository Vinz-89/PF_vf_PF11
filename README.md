## Présentation du projet
Version finale du projet finale du cours LINFO1212 "Projet d'approfondissement en sciences informatiques".

## Participant(s) au projet
+ Pajaziti Rinim
+ Meessen Vincent
+ Felis Maxence

## Date et intitulé 
+ Date : 17 Décembre 2024
+ Intitulé : Développement d'un site internet pour un Véterinaire dans le cadre du projet final du cours "LINFO1212"

## Langages utilisés ?
+ Utilisation d'HTML pour le template des pages.
+ Utilisation de CSS pour donner des couleurs/effets aux pages du site.
+ Utilisation de Guerkin pour créer les fichiers '.features' des fonctionnalités devant être ajoutées.
+ Utilisation de javascript pour l'implementation du site.
+ Utilisation de JSON pour la création de base de donnée ainsi que la gestion des packages.


## Structure globale
+ Le projet est organisé de manière modulaire, inspiré du projet 2 :
    + views : contient les fichiers des différentes pages en Embedded JavaScript
    + styles : Contient les images et les fichiers CSS utilisés dans le projet. 
    + features : Contient les fonctionnalités primordiale devant être rajoutées avec du Java Script.
    + DB_Init : Structure initiale de la base de donnée.
    + DB : Le fichier comportant la base de donnée (utilisant mongodb) (Localisation non obligatoire)
    + tests : Les différents tests utilisable du site.

## Instructions ou Conseil
+ Chemin du logo: Le chemin d'accès au logo dans l'en-tête de chaque page est spécifié.
+ Problèmes: En cas de problème, souvent lié au fichier app.js et "express.static('styles')", copier manuellement le chemin complet de l'image "../styles/photos/UCL.png" et le remplacer dans le code HTML/ejs de l'en-tête.

+ Generer la base de donnée dans le fichier ./DB (Ou autre part si vous préférez).
|    >mongod --dbpath *PATH*\PF_vf_PF11\Projet_Final\DB

+ Importer les différentes saves dans la base de donnée (Pas obligatoire)
|    >mongoimport -d siteDb -c account *PATH*\PF_vf_PF11\Projet_Final\DB_Init\account.json
|    >mongoimport -d siteDb -c animals *PATH*\PF_vf_PF11\Projet_Final\DB_Init\animals.json

+ Si vous voulez vérifier que l'importation a bien été effectuer vous pouvez faire
|    >mongosh
|    >mongosh> use siteDb
|    >mongosh> db.account.find()

+ Si vous voulez supprimer les composant d une collection
|    >mongosh> db.account.deleteMany({})

+ Si vous voulez modifier l'adresse mail de réception des rendez-vous pour le vétérinaire vous pouvez modifier la variable <veterinarian_mail> dans le fichier /app.js ligne 24

+ Pour lancer les tests faite
    |    >npm test

+ Enfin pour lancer le site faite
    |    >node .\app.js