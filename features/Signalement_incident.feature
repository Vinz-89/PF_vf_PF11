# language: fr

Fonctionnalité: Signalement d'incidents
    Les citoyens peuvent signaler un incident en fournissant une date, une adresse et une description.
    L'incident sera ensuite ajouté sur la page des incidents.

    Scénario: Toutes les données sont valides
        Étant donné que l'adresse est au bon format et est valide
        Et que la date est au bon format et est valide
        Et que la description est valide et n'est pas trop longue ou trop courte
        Lorsque le citoyen soumet le formulaire
        Alors l'incident devrait être ajouté à la page des incidents
        Et la page devrait être mise à jour

    Scénario: L'adresse est invalide
        Étant donné que l'adresse n'est pas au bon format ou n'est pas valide
        Lorsque le citoyen soumet le formulaire
        Alors l'incident ne devrait pas être ajouté
        Et un message d'erreur devrait être affiché pour demander une adresse valide

    Scénario: La date est invalide
        Étant donné que la date n'est pas au bon format ou n'est pas valide
        Lorsque le citoyen soumet le formulaire
        Alors l'incident ne devrait pas être ajouté
        Et un message d'erreur devrait être affiché pour demander une date valide

    Scénario: La description n'est pas valide
        Étant donné que la description dépasse une certaines tailles ou n'est pas assez grande
        Lorsque le citoyen soumet le formulaire
        Alors l'incident ne devrait pas être ajouté
        Et un message d'erreur devrait être affiché pour demander une déscription valide