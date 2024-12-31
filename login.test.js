const request = require('supertest');
const app = require('./app');
const MongoClient = require('mongodb').MongoClient;

describe("Tests de la route identification", () => {
    let dbo;

    beforeAll(async () => {
        const uri = 'mongodb://localhost:27017';
        const client = await MongoClient.connect(uri);
        dbo = client.db("siteDb");
        await dbo.collection('account').insertOne({ username: "on1x", password: "secret" });
    });

    afterAll(async () => {
        await dbo.collection('account').deleteOne({ username: "on1x" });
    });

    test("Retourne la page d'identification si l'utilisateur est connecté avec un nom d'utilisateur et mot de passe valide", async() => {
        const response = await request(app)
            .post("/ident.html")
            .send({username: "on1x", password: "secret"});
        expect(response.status).toBe(302);
        //expect(response.header.location).toBe('incident.html');
    });
});