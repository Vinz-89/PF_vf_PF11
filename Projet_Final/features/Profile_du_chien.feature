Fonctionnalité: Ouverture du profil d'un chien
    Les utilisateurs peuvent ouvrir le profil d'un de leurs chiens pour consulter 
    les informations détaillées et accéder aux options spécifiques pour chaque chien.

    Scénario: Accéder au profil d’un chien depuis le profil utilisateur
        Étant donné que l'utilisateur est connecté sur son profil
        Et qu'il possède au moins un chien enregistré dans sa liste de chiens
        Lorsque l'utilisateur clique sur le nom ou l'icône d'un chien dans sa liste
        Alors le site devrait rediriger vers la page du profil de ce chien (/profile/chien-{id}) pour afficher les informations détaillées

    Scénario: Message d’erreur si le chien n’existe pas
        Étant donné que l'utilisateur est connecté et tente d'accéder au profil d'un chien
        Et que le profil de ce chien n'est pas trouvé (exemple : ID invalide ou profil supprimé)
        Lorsque l'utilisateur tente d'ouvrir ce profil
        Alors le site devrait afficher un message d'erreur indiquant que le profil du chien est introuvable
        Et rediriger l'utilisateur vers la page de profil utilisateur (/profile)

    Scénario: Accéder à la prise de rendez-vous depuis le profil du chien
        Étant donné que l'utilisateur est sur la page de profil d'un de ses chiens
        Lorsque l'utilisateur clique sur le bouton "Prendre un rendez-vous"
        Alors le site devrait rediriger vers la page de prise de rendez-vous (/rendez-vous), en sélectionnant automatiquement ce chien pour le rendez-vous
    
    Scénario: Consultation et téléchargement des documents vétérinaires du chien
        Étant donné que l'utilisateur est connecté et qu'il a accédé au profil d'un de ses chiens
        Et que des documents vétérinaires ont été ajoutés à ce profil
        Lorsque l'utilisateur clique sur la section "Documents vétérinaires"
        Alors le site devrait afficher une liste des documents disponibles pour ce chien, incluant les types de document, les dates, et les descriptions
        Et permettre à l'utilisateur de cliquer sur chaque document pour le télécharger en format PDF
        Et afficher un message de confirmation indiquant que le document a été téléchargé avec succès.

    Scénario: Modification des informations du chien
        Étant donné que l'utilisateur est connecté sur son profil et qu'il a un chien enregistré
        Et qu'il navigue vers la page du profil de ce chien
        Lorsque l'utilisateur clique sur "Modifier" et change les informations du chien
        Alors le site devrait sauvegarder les informations mises à jour et afficher un message confirmant que les informations du chien ont été mises à jour avec succès.

    Scénario: Suppression d’un chien
        Étant donné que l'utilisateur est connecté sur son profil et qu'il a un chien enregistré
        Lorsque l'utilisateur clique sur "Supprimer" sur le profil de ce chien
        Alors le site devrait demander une confirmation avant de supprimer définitivement le profil du chien de l'utilisateur.