Fonctionnalité: Redirection
    Lorsqu'un utilisateur non connecté ou sans animal associé à son profil interagit avec un service,
    il sera redirigé vers la page de connexion ou d’ajout d’animal.

    Scénario: utilisateur non connecté avec animal déjà associé 
        L’utilisateur est redirigé vers la page de connexion.
        Lorsqu’il se connecte il est redirigé vers le service.

    Scénario: utilisateur non connecté sans animal déjà associé 
        L’utilisateur est redirigé vers la page de connexion.
        Lorsqu’il se connecte il est redirigé vers la page d’ajout d’animal.
        Lorsqu’il a ajouté son animal, il est dirigé vers le service.

    Scénario: utilisateur connecté avec animal associé
        L’utilisateur est redirigé vers le service.

    Scénario: utilisateur connecté sans animal associé
        L’utilisateur est redirigé vers la page d’ajout d’animal.
        Lorsqu’il a ajouté son animal, il est dirigé vers le service.
