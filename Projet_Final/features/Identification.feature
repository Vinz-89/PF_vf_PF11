Fonctionnalité: Identification
    Les utilisateurs peuvent s'identifier sur le site afin d'accéder à des fonctionnalités
    pour les membres authentifiés du site.

    Scénario: identification valide
        Étant donné que l'utilisateurs a un compte avec l'email "identifiant@hotmail.com" et mot de passe "password"
        Et que l'email entré est bien "identifiant@hotmail.com"
        Et que le mot de passe entré est bien "password"
        Lorsque l'utilisateurs clique sur "Connexion"
        Alors l'utilisateurs devrait être redirigé sur la page d'accueil de son compte
        Et proposera donc à l'utilisateur d’enregistrer un ou plusieurs compte de chien sur son profile
    
    Scénario: identification avec un email incorrect 
        Étant donné que l'utilisateurs a un compte avec l'email "identifiant@hotmail.com" et mot de passe "password"
        Et que l'email entré n'est pas "identifiant@hotmail.com"
        Et que le mot de passe entré est bien "password"
        Lorsque l'utilisateurs clique sur "Connexion"
        Alors l'utilisateurs devrait rester sur la page d'identification
        Et un message d'erreur devrait s'afficher indiquant que l'email entré est incorrect

    Scénario: identification avec un mot de passe incorrect
        Étant donné que l'utilisateurs a un compte avec l'email "identifiant@hotmail.com" et mot de passe "password"
        Et que l'email entré est bien "identifiant@hotmail.com"
        Et que le mot de passe entré n'est pas "password"
        Lorsque l'utilisateurs clique sur "Connexion"
        Alors l'utilisateurs devrait rester sur la page d'identification
        Et un message d'erreur devrait s'afficher indiquant que le mot de passse entré est incorrect

    Scénario: identification avec mot de passe et email incorrect
        Étant donné que l'utilisateurs a un compte avec l'email "identifiant@hotmail.com" et mot de passe "password"
        Et que l'email entré n'est pas "identifiant@hotmail.com"
        Et que le mot de passe entré n'est pas "password"
        Lorsque l'utilisateurs clique sur "Connexion"
        Alors l'utilisateurs devrait rester sur la page d'identification
        Et un message d'erreur devrait s'afficher indiquant que le mot de passse entré et l'email entré sont incorrect
    
    Scénario: champ de mot de passe vide
        Étant donné que l'utilisateurs a un compte avec l'email "identifiant@hotmail.com" et mot de passe "password"
        Et qu'aucun mot de passe n'est entré dans le champ mot de passe
        Lorsque l'utilisateurs clique sur "Connexion"
        Alors l'utilisateurs devrait rester sur la page d'identification
        Et un message d'erreur devrait s'afficher indiquant que le champ mot de passe est obligatoire
    
    Scénario: champ d'email vide
        Étant donné que l'utilisateurs a un compte avec l'email "identifiant@hotmail.com" et mot de passe "password"
        Et qu'aucun email n'est entré dans le champ email
        Lorsque l'utilisateurs clique sur "Connexion"
        Alors l'utilisateurs devrait rester sur la page d'identification
        Et un message d'erreur devrait s'afficher indiquant que l'email est obligatoire

    Scénario: Mot de passe oublié
        Étant donné que l'utilisateur a oublié son mot de passe
        Et qu'il clique sur le lien "Mot de passe oublié" sur la page d'identification
        Lorsque l'utilisateur entre son adresse email et clique sur "Envoyer"
        Alors un email de réinitialisation du mot de passe devrait être envoyé à l'adresse indiquée
        Et le site devrait afficher un message confirmant l'envoi de l'email de réinitialisation

    Scénario: Réinitialisation de mot de passe
        Étant donné que l'utilisateur a reçu un email de réinitialisation de mot de passe
        Lorsque l'utilisateur clique sur le lien dans l'email et arrive sur la page de réinitialisation
        Et qu'il entre un nouveau mot de passe et confirme celui-ci
        Alors le mot de passe de l'utilisateur devrait être mis à jour et l'utilisateur redirigé vers la page de connexion avec un message de succès