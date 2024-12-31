const request = require('supertest-session');
const app = require('../app');
const MongoClient = require('mongodb').MongoClient;

describe('Tests HTTP avec Supertest', () => {
  let dbo;

  // Avant de lancer les tests, connecter MongoDB et configurer l'environnement
  beforeAll(async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    dbo = client.db('siteDb');
    const result = await dbo.collection('account').findOneAndDelete({ user: 'johndoe' });
    const result2 = await dbo.collection('animals').findOneAndDelete({ owner: 'johndoe' });
  });

  // Test pour la page d'accueil
  it('devrait rediriger vers /acceuil', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/acceuil');
  });

  // Test pour la route /acceuil
  it('devrait rendre la page d\'accueil avec le bon statut', async () => {
    const response = await request(app).get('/acceuil');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Acceuil');
  });

  // Test pour la page de connexion
  it('devrait rendre la page de connexion', async () => {
    const response = await request(app).get('/connexion');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Connexion');
  });

  // Test pour la création d'un compte
  it('devrait créer un compte et rediriger vers /profile', async () => {
    const response = await request(app)
        .post('/create_account')
        .set('Content-Type', 'application/json')
        .send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            user: 'johndoe',
            mdp: 'password123'
        });
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/profile');
  });

  // Test de connexion avec un utilisateur existant
  it('devrait se connecter avec des identifiants valides', async () => {
    const agent = request(app);

    const response = await agent
      .post('/profile')
      .send({
        username: 'johndoe',
        password: 'password123'
      });



    expect(response.status).toBe(302);
    //expect(response.header.location).toBe('/acceuil');
    expect(response.header.location).toBe('profile');

    const profileResponse = await agent.get('/profile');

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.text).toContain('profil');

  });

  // Test pour vérifier qu'un utilisateur non connecté est redirigé vers /connexion
  it('devrait rediriger vers /connexion si l\'utilisateur n\'est pas connecté', async () => {
    const response = await request(app).get('/profile');
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('connexion');
  });

  // Fermer la connexion MongoDB après tous les tests
  afterAll(async () => {
    await dbo.client.close();
  });
});
