Fonctionnalité: Recherche d'incident
    Les citoyens peuvent rechercher les incidents sur la page Incident 
    que ce soit par date par adresse ou bien par déscription d'incident

    Scénario: recherche par adresse
        Étant donné que l'adresse est valide
        Lorsque le citoyen fait sa recherche
        Alors le site devrait filtrer les incidents par adresse
        Et les afficher par ordre chronologique du plus récent au plus ancien
    
    Scénario: recherche par date
        Étant donné que la date est valide
        Lorsque le citoyen fait sa recherche
        Alors le site devrait filtrer les incidents par date
        Et n'afficher que les incidents ayant eu lieu à la date spécifiée

    Scénario: recherche par déscription
        Étant donné que la déscription est valide
        Lorsque le citoyen fait sa recherche
        Alors le site devrait filtrer les incidents par déscription
        Et afficher les incidents par ordre de pertinence