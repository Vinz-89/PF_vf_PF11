Fonctionnalité: Prise de Rendez-vous
    Les utilisateurs peuvent prendre rendez-vous pour un de leur chien
    et auront des dates proposées suivant l'urgence du rendez-vous

    Scénario: rendez-vous non-urgent
        Étant donné que l'utilisateur est connecté sur son profil
        Et qu'au moins un chien soit présent sur ce profil
        Lorsque l'utilisateur prend un rendez-vous non-urgent pour un des chiens sur son profil
        Alors le site devrait renvoyer sur une page des dates/heures disponibles pour le rendez-vous
        Et ne permettre de prendre rendez-vous que pour les dates à partir de demain
    
    Scénario: rendez-vous rapide
        Étant donné l'utilisateur est connecté sur son profil
        Et qu'au moins un chien soit présent sur ce profil
        Lorsque l'utilisateur prend un rendez-vous rapide pour un des chiens sur son profil
        Alors le site devrait renvoyer sur une page de prise de rendez-vous avec les heures disponibles pour le rendez-vous
        Et ne permettre de prendre rendez-vous que pour les heures d'aujourd'hui

    Scénario: rendez-vous urgent
        Étant donné l'utilisateur est connecté sur son profil
        Et qu'au moins un chien soit présent sur ce profil
        Lorsque l'utilisateur prend un rendez-vous urgent pour un des chiens sur son profil
        Alors le site devrait renvoyer sur une page de prise de rendez-vous avec les heures disponibles pour le rendez-vous
        Et permettre de prendre rendez-vous pour les premières heures
