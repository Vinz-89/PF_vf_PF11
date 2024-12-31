Fonctionnalité: Ajout des informations d'un chien
    Les utilisateurs peuvent ajouter les informations de son chien directement depuis leurs profile
    en lui créant un "profil chien".
    
    Scénario: Identification du chien valide
        Étant donné que l'utilisateur est connecté sur son profil
        Et qu'il ait inscrit le nom, la race, la date de naissance et des informations supplémentaires du chien.
        Lorsque le citoyen clique sur "Connexion"
        Alors le site devrait ajouter le chien sur son profile (/profile) ainsi que ouvre la page du chien (/profile/chien-{id})

    Scénario: Informations manquantes
        Étant donné que l'utilisateur est connecté sur son profil
        Et que certains champs obligatoires comme le nom ou la race du chien ne sont pas remplis
        Lorsque l'utilisateur clique sur "Enregistrer"
        Alors le site devrait afficher un message d'erreur indiquant les champs manquants et empêcher la sauvegarde jusqu'à ce que les informations soient complétées.