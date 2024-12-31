Fonctionnalité: Identification
    Les citoyens peuvent s'identifier sur le site afin d'accéder à des fonctionnalités
    pour les membres authentifiés du site.

    Scénario: identification valide
        Étant donné que le citoyen a un compte avec l'email "prenom@hotmail.com" et mot de passe "password"
        Et que l'email entré est bien "prenom@hotmail.com"
        Et que le mot de passe entré est bien "password"
        Lorsque le citoyen clique sur "Connexion"
        Alors le citoyen devrait être redirigé sur la page d'acceuil de son compte
        Et un message de bienvenue devrait s'afficher
    
    Scénario: identification avec un email incorrect 
        Étant donné que le citoyen a un compte avec l'email "prenom@hotmail.com" et mot de passe "password"
        Et que l'email entré n'est pas "prenom@hotmail.com"
        Et que le mot de passe entré est bien "password"
        Lorsque le citoyen clique sur "Connexion"
        Alors le citoyen devrait rester sur la page d'identification
        Et un message d'erreur devrait s'afficher indiquant que l'email entré est incorrect

    Scénario: identification avec un mot de passe incorrect
        Étant donné que le citoyen a un compte avec l'email "prenom@hotmail.com" et mot de passe "password"
        Et que l'email entré est bien "prenom@hotmail.com"
        Et que le mot de passe entré n'est pas "password"
        Lorsque le citoyen clique sur "Connexion"
        Alors le citoyen devrait rester sur la page d'identification
        Et un message d'erreur devrait s'afficher indiquant que le mot de passse entré est incorrect

    Scénario: identification avec mot de passe et email incorrect
        Étant donné que le citoyen a un compte avec l'email "prenom@hotmail.com" et mot de passe "password"
        Et que l'email entré n'est pas "prenom@hotmail.com"
        Et que le mot de passe entré n'est pas "password"
        Lorsque le citoyen clique sur "Connexion"
        Alors le citoyen devrait rester sur la page d'identification
        Et un message d'erreur devrait s'afficher indiquant que le mot de passse entré et l'email entré sont incorrect
    
    Scénario: champ de mot de passe vide
        Étant donné que le citoyen a un compte avec l'email "prenom@hotmail.com" et mot de passe "password"
        Et qu'aucun mot de passe n'est entré dans le champ mot de passe
        Lorsque le citoyen clique sur "Connexion"
        Alors le citoyen devrait rester sur la page d'identification
        Et un message d'erreur devrait s'afficher indiquant que le champ mot de passe est obligatoire
    
    Scénario: champ d'email vide
        Étant donné que le citoyen a un compte avec l'email "prenom@hotmail.com" et mot de passe "password"
        Et qu'aucun email n'est entré dans le champ email
        Lorsque le citoyen clique sur "Connexion"
        Alors le citoyen devrait rester sur la page d'identification
        Et un message d'erreur devrait s'afficher indiquant que l'email est obligatoire