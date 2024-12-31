let express = require('express'),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { checkUserInput } = require('./check_input.js');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rinimpajaziti63@gmail.com',
        pass: 'azrc pmzf ixxv iskp'
    },
    logger: true,
    debug: true
});

const veterinarian_mail = 'viencentmeessen@gmail.com'

const getCurrentDay = () => {
    const mois = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const date = new Date();
    const jour = date.getDate();
    const moisLettres = mois[date.getMonth()];
    const annee = date.getFullYear();
    return jour+"-"+moisLettres+"-"+annee;
};

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('styles'));
app.use(session({
    secret: "propre123",
    resave: true,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 3600000
    }
}));

app.use(express.json());

// ! Récupération du compte en utilisant le mot de passe non hashé
async function get_account(username, password, dbo)
{
    if(!username){
        return null;
    }
    const user = await dbo.collection('account').findOne({ user: username });
    if (!user) {
        return null; // Utilisateur introuvable
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null;
    }
    return user;
}

// ! Récupération du compte en utilisant le mot de passe hashé
async function get_account_hashed(username, hashedPassword, dbo)
{
    if(!username){
        return null;
    }
    const account = await dbo.collection('account').findOne({ user: username, password: hashedPassword });  
    if(!account){
        return null;
    }
    return account;
}


/* ############################### HTTPS SERVER SETUP ############################ */

async function setupMongo() {
    const uri = 'mongodb://localhost:27017';

    try {
        const client = await MongoClient.connect(uri);

        console.log("Connected to MongoDB");
        let dbo = client.db("siteDb");

        // ! Page de base
        app.get('/', async (req, res) => {
            console.log('GET /');
            
            return res.redirect('/acceuil');
        })

        // ! Page d'acceuil
        app.get('/acceuil', async (req, res) => {
            console.log('GET /acceuil');
            
            res.render('acceuil.ejs', {session: req.session},);
        })

        // ! Si les cookies sont sauvegardées redirigent vers la page profil, sinon à la page de connexion
        app.get('/connexion', async (req, res) => {
            console.log('GET /connexion | cookie: ', req.session.username, req.session.password); 
            const account = await get_account_hashed(req.session.username, req.session.password, dbo)
            if(account == null)
            {
                return res.render('connexion.ejs', { session: req.session, errorMessage: null });
            }

            return res.redirect('profile');
        });

        // ! Ouverture de la page d'identification. Si l'utilisateur possède un compte le redirige vers son compte
        app.get('/identification', async (req, res) => {
            console.log('GET /identification'); 
            const account = await get_account_hashed(req.session.username, req.session.password, dbo)
            if(account != null)
            {
                return res.redirect('profile');
            }

            return res.render('identification.ejs');
        });

        
        // ! Ajout d'un nouvel utilisateur à la base de données via la page d'identification puis redirige vers la page de son nouveau profile
        app.post('/create_account', async (req, res) => {
            console.log('POST /create_account'); 
            console.log('-----------------------------POST /create_account', req.body, req.session.mdp); 
            const{name,email,user,mdp} = req.body;
            const utilisateur = await dbo.collection('account').findOne({user});

            if(utilisateur){
                console.log('Utilisateur déjà existant :', utilisateur.user);
                return res.render('identification.ejs', { errorMessage: 'Nom d\'utilisateur déjà existant' });
            }
            if(!checkUserInput.isValidPassword(mdp))
            {
                console.log('Mot de passe invalide');
                return res.render('identification.ejs', { errorMessage: 'Mot de passe invalide, minimum 8 caractères et pas uniquement lettres' });
            }

            if(!checkUserInput.isValidEmail(email))
            {
                console.log('Email non valide');
                return res.render('identification.ejs', { errorMessage: 'Email non invalide' });
            }

            try{
                const saltRounds = 8;
                const hashedPassword = await bcrypt.hash(mdp, saltRounds);

                const result = await dbo.collection('account').insertOne({name: name, email: email, user: user, password: hashedPassword});

                console.log('Utilisateur ajouté avec succès :', name);

                req.session.username = user;
                req.session.password = hashedPassword;
                res.redirect('/profile');
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
                res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
            }
        });

        // ! vérifie les cookies, si ils correspondent à un utilisateur redirige vers la page de profil, sinon redirige vers la page de connexion
        app.get('/profile', async (req, res) => {
            console.log('GET /profile with : ', req.session.username, req.session.password);
            const account = await get_account_hashed(req.session.username, req.session.password, dbo)
            if(account == null)
            {
                return res.redirect('connexion');
            }
            
            const doc = await dbo.collection('animals').find({ owner: req.session.username }).toArray();  
            return res.render('profile.ejs', {animals: doc, user: req.session.username, session: req.session});
        });

        // ! Connection au profile avec les information de la page de connexion si elle sont vailide, sinon redirige vers la page de connexion
        app.post('/profile', async (req, res) => {
            console.log('POST /profile with  ', req.body.username, req.body.password);
            const { username, password } = req.body;
            const account = await get_account(username, password, dbo)
            if(account == null)
            {
                console.log('Authentification échouée');
                return res.render('connexion.ejs', { errorMessage: "Nom d'utilisateur ou mot de passe invalide" });
            }
            console.log('Connexion réussie pour :', account.user);

            req.session.username = account.user;
            req.session.password = account.password;
            return res.redirect('profile');
        });

        // ! Si l'utilisateur est connecté redirige vers la page d'ajout d'un animal pour son profil, sinon redirige vers la page de connexion
        app.get('/profile_ajout_compagnion', async (req, res) => {
            console.log('GET /profile_ajout_compagnion with : ', req.session.username);
            const account = await get_account_hashed(req.session.username, req.session.password, dbo)
            if(account == null)
            {
                return res.redirect('connexion');
            }

            const animals = await dbo.collection('animals').find({ owner: account.user}).toArray();
            return res.render('ajouter_compagnion.ejs', {username: account.user, animals: animals, session: req.session});
        });

        // ! Ajouter un animal à la database puis redirige vers la page profil, redirige vers la page de connexion si l'utilisateur n'est pas connecté
        app.post('/profile_ajout_compagnion', async (req, res) => {
            console.log('POST /profile_ajout_compagnion with : ', req.session.username);
            const { name, species, breed, Age, gender } = req.body;
            const account = await get_account_hashed(req.session.username, req.session.password, dbo)
            if(account == null)
            {
                return res.redirect('connexion');
            }
            
            // Ajout de l'animal dans la base de données
            try {
                const result = await dbo.collection('animals').insertOne({name: name, species: species, breed: breed, age: Age, gender: gender, owner: account.user });

                console.log('Animal ajouté avec succès :', result);
                res.redirect('/profile');
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'animal:', error);
                res.status(500).send('Erreur lors de l\'ajout de l\'animal');
            }
        });

        // ! Ouverture de la page du compagnion en utilisant dans les cookie le profile de la personne et l'index du compagnion
        app.get('/profile_compagnion-:index', async (req, res) => {
            const index = parseInt(req.params.index, 10) - 1;
            console.log('GET /profile_compagnion-%s with  ', index+1, req.session.username, req.session.password);
            const account = await get_account_hashed(req.session.username, req.session.password, dbo)
            if(account == null)
            {
                return res.redirect('connexion');
            }

            const animals = await dbo.collection('animals').find({ owner: account.user }).toArray();  
            if (animals && animals.length >= index && index >= 0) {
                const selectedAnimal = animals[index];
                console.log('Selected animal:', selectedAnimal.name);
                return res.render('compagnion.ejs', {compagnion: selectedAnimal, index: index + 1, session: req.session });
            }
            return res.redirect('/profile',); // Fail
        });

        // ! Supprimer le compagnion selectionner depuis la page /profile_compagnion-<id>
        app.post('/delete_compagnion-:index', async (req, res) => {
            const index = parseInt(req.params.index, 10) - 1;  // L'ID de l'animal à supprimer
            console.log('POST /delete_compagnion-:index', index, req.session.username, req.session.password);
            const account = await get_account_hashed(req.session.username, req.session.password, dbo)
            if(account == null)
            {
                return res.redirect('connexion');
            }

            const animals = await dbo.collection('animals').find({ owner: req.session.username }).toArray(); 
            if (animals && animals.length >= index && index >= 0) 
            {
                const selectedAnimal = animals[index];
                console.log('delete animal:', selectedAnimal);
                const result = await dbo.collection('animals').findOneAndDelete(selectedAnimal);
            }
            return res.redirect('/profile');
        });


        // ! Si l'utilisateur est connecté, redirige vers la page de rendez-vous, sinon redirige vers la page de connexion
        app.get('/rdv', async (req, res) => {
            console.log('GET /rdv with : ', req.session.username, req.session.password);
            const account = await get_account_hashed(req.session.username, req.session.password, dbo)
            if(account == null)
            {
                return res.redirect('connexion');
            }

            const animals = await dbo.collection('animals').find({ owner: account.user}).toArray();
            return res.render('rdv.ejs', {username: req.session.username, animals: animals, session: req.session, selectedAnimalId: null});
        })

        // ! Ouvre la page de randez-vous dépendament de certaines informations
        app.post('/rdv', async (req, res) => {
            console.log('POST /rdv with : ', req.session.username, req.session.password, req.body.selectedAnimalId);
            const account = await get_account_hashed(req.session.username, req.session.password, dbo)
            if(account == null)
            {
                return res.redirect('connexion');
            }

            const animals = await dbo.collection('animals').find({ owner: account.user}).toArray();
            return res.render('rdv.ejs', {username: account.user, animals, session: req.session, selectedAnimalId: req.body.selectedAnimalId});
        })

        // ! Ouvre la page de randez-vous dépendament de certaines informations
        app.post('/send-rdv-mail', async (req, res) => {
            const { phoneNumber, adresse, animal_id, typeRdv, description } = req.body;
            console.log('POST /send-rdv-mail with : ', req.session.username, req.session.password, req.body.selectedAnimalId);
            const account = await get_account_hashed(req.session.username, req.session.password, dbo)
            if(account == null)
            {
                return res.redirect('connexion');
            }

            const animals = await dbo.collection('animals').find({ owner: account.user }).toArray();  
            if (!(animals && animals.length >= animal_id && animal_id >= 0)) {
                return res.redirect('rdv');
            }

            const selectedAnimal = animals[animal_id];
            console.log('envoie du mail pour l animal: ', animal_id, selectedAnimal.name);
            try{
                const mailOptions = {
                    from: 'Profession@outlook.be',
                    to: veterinarian_mail,
                    subject: `Nouveau rendez-vous pris par ${account.name}`,
                    text: `Détails du rendez-vous [${getCurrentDay()}] :
                            Type de rendez-vous : ${typeRdv}

                            Nom du propriétaire : ${account.name} (${account.user})
                            Numéro de téléphone : ${phoneNumber}
                            Adresse : ${adresse}
                            Animal Nom : ${selectedAnimal.name}
                            Animal Espèce : ${selectedAnimal.species}
                            Animal Race : ${selectedAnimal.breed}
                            Animal Age : ${selectedAnimal.age}
                            Animal Sexe : ${selectedAnimal.gender}

                            Description : ${description}
                            
                            Merci de prendre en compte ce rendez-vous.`,
                    };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Erreur lors de l\'envoi du mail :', error);
                        return res.status(500).send('Erreur lors de l\'envoi du mail');
                    } else {
                        console.log('Email envoyé:');
                        res.redirect('/profile');
                    }
                });

            }catch(error){
                console.log('Erreur lors de la prise de rendez-vous: ', error);
                res.status(500).send('Erreur lors de la prise de rendez-vous');
            }
        })
        
        // ! Route pour la déconnexion via le bouton en haut de la page
        app.get('/logout', (req, res) => {
            req.session.destroy(err => {
                if (err) {
                    console.error('Erreur lors de la déconnexion:', err);
                    return res.redirect('/profile'); 
                }
                res.clearCookie('connect.sid'); 
                res.redirect('/acceuil'); 
            });
        });

        // ! https://localhost:3000/
        https.createServer({
            key: fs.readFileSync('./key.pem'),
            cert: fs.readFileSync('./cert.pem'),
            passphrase: 'ingi'
        }, app).listen(3000);   

        console.log("Ready to use");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
}

setupMongo();
module.exports = app;