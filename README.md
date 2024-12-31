## Présentation du projet
Version finale du projet préparatoire du cours LINFO1212 "Projet d'approfondissement en sciences informatiques".

## Participant(s) au projet
+ Pajaziti Rinim
+ Meessen Vincent
+ Felis Maxence

## Date et intitulé 
+ Date : 30 Septembre 2024
+ Intitulé : Développement de la version finale du projet préparatoire. 

## Langages utilisés ?
+ Utilisation d'HTML pour le template des pages.
+ Utilisation de CSS pour donner des couleurs/effets aux pages du site.
+ Utilisation de Guerkin pour créer les fichiers '.features' des fonctionnalités devant être ajoutées.
+ Utilisation de javascript pour l implementation du site.
+ Utilisation de JSON pour la création de base de donnée ainsi que la gestion des packages.


## Structure globale
+ Le projet est organisé de manière modulaire, inspiré du projet 2 :
    + views : contient les fichiers différentes pages en Embedded JavaScript
    + styles : Contient les images et les fichiers CSS utilisés dans le projet. 
    + features : Contient les fonctionnalités primordiale devant être rajoutées avec du Java Script.
    + DB_Init : Structure initiale de la base de donnée.
    + DB : Le fichier comportant la base de donnée (utilisant mongodb)


## Instructions ou Conseil
+ Chemin du logo: Le chemin d'accès au logo dans l'en-tête de chaque page est spécifié.
+ Problèmes: En cas de problème, copier manuellement le chemin complet de l'image "../styles/photos/UCL.png" et le remplacer dans le code HTML de l'en-tête.

+ Generer la base de donnée dans le fichier ./DB ainsi que de l'allumer.
    mongod --dbpath *PATH*\Projet_Testing\DB

+ Importer les différentes saves dans la base de donnée
    mongoimport -d siteDb -c account *PATH*\Projet_Testing\DB_Init\account.json
    mongoimport -d siteDb -c incident *PATH*\Projet_Testing\DB_Init\incident.json

+ Si vous voulez vérifier que l'importation a bien été effectuer vous pouvez faire
    mongosh
    mongosh> use siteDb
    mongosh> db.account.find()

+ Si vous voulez supprimer les composant d une collection
    mongosh> db.account.deleteMany({})

+ Enfin pour lancer le site faite
    node .\app.js

+ Pour lancer les tests faite


C:\Users\Vincent\Documents\UCL\Projet\PP_vf_A14\Projet_Final