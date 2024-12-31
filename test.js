let express = require('express'),
engines = require('consolidate'),
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server;
const session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');

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

module.exports = app;

async function setupMongo() {
    const uri = 'mongodb://localhost:27017';

    try {
        const client = await MongoClient.connect(uri);

        console.log("Connected to MongoDB");
        let dbo = client.db("siteDb");


        // GET
        app.get('/acceuil.html', async function(req, res, next) {
            console.log('GET /acceuil.html');
            const doc = await dbo.collection('incident').find().toArray();  
            console.log('Fetched document:', doc);
            
            res.render('acceuil.ejs', {date: getCurrentDay(), incidents: doc});
        })

        app.get('/ident.html', async function(req, res, next) {
            console.log('GET /ident.html'); 
            const doc = await dbo.collection('account').findOne({ username: req.body.username, password: req.body.password });  
            console.log('Fetched document:', doc);
            if(doc)
            {
                req.session.username = req.body.username;
                return res.redirect('incident.html');
            }
            else{
                return res.render('identification.ejs', {date: getCurrentDay()});
            }
        });

        app.get('/incident.html', function(req, res, next){
            if(req.session.username){
                console.log(req.session.username);
                return res.render('incident.ejs', {username: req.session.username, date: getCurrentDay()});
            }
            else{
                return res.redirect('/ident.html');
            }
        });

        app.get('*', (req, res) => {
            console.log("no page found");
            res.redirect('/acceuil.html');
            //res.status(404).send('Page Not Found');
        });

        // POST
        app.post('/acceuil.html', async function(req, res, next) {
            console.log('GET /acceuil.html');
            const doc = await dbo.collection('incident').find().toArray();  
            console.log('Fetched document:', doc);
            
            res.render('acceuil.ejs', {date: getCurrentDay(), incidents: doc});
        })

        app.post('/ident.html', async function(req, res, next) {
            console.log('POST /ident.html'); 
            const doc = await dbo.collection('account').findOne({ username: req.body.username, password: req.body.password });
            console.log('Fetched document:', doc);
            if(doc)
            {
                req.session.username = req.body.username;
                return res.redirect('incident.html');
            }
            else{
                return res.redirect('/ident.html');
            }
        });

        app.post('/subm.html', async function(req, res, next){
            const{desc,addre}=req.body;
            console.log("POST /subm.html avec %s %s", req.body.desc, req.body.addre); 

            if(req.session.username){
                //res.render('submited', { description: "super description", addresse: "l address", username: "vinz", date: "2012-04-22"});
                await dbo.collection('incident').insertOne({description: desc, addresse: addre, username: req.session.username, date: getCurrentDay()});
                res.render('submited', { username: req.session.username, description: desc, date: getCurrentDay()});
            }
            else{
                res.redirect('/ident.html');
            }
        });


        app.post('/compte.html', async function(req, res, next){
            const{nom_utilisateur,mdp,nom_complet,email}=req.body;
            const utilisateur = await dbo.collection('account').findOne({nom_utilisateur });
            if(utilisateur){
                return res.render('identification.ejs', {date: getCurrentDay(),compteexistant:"compte déja créer",pasutilisateur:"",mauvaismdp:""});
            }
            await dbo.collection('account').insertOne({username: nom_utilisateur ,password: mdp});
            req.session.username =nom_utilisateur;
            res.redirect('/incident.html');
        });

        https.createServer({
            key: fs.readFileSync('./key.pem'),
            cert: fs.readFileSync('./cert.pem'),
            passphrase: 'ingi'
        }, app).listen(3000);   
        // app.listen(8080, () => {
        //     console.log('Server is running on http://localhost:8080');
        // });

        console.log("Ready to use");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
} 

setupMongo();
