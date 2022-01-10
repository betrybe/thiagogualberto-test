const chai = require('chai');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';

const app = require('../api/app');

chai.use(chaiHttp);
chai.should();

describe('Initial data needed to run integration tests.', () => {
    let connection;
    let db;
    
    it ('Should register a new user (role = user).', done => {
        const user = {
            name: 'Thiago Gualberto',
            email: 'thiago.gou@gmail.com',
            password: '12345678'
        };

        chai.request(app)
        .post('/users')
        .send(user)
        .end((err, response) => {
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('user').property('name').eq(user.name);
            response.body.should.have.property('user').property('email').eq(user.email);
            response.body.should.have.property('user').property('role').eq('user');
            response.body.should.have.property('user').property('_id');
            done();
        });
    });

    it ('Should register a second user (role = user).', done => {
        const user = {
            name: 'Diego Gualberto',
            email: 'diego@gmail.com',
            password: '12345678'
        };

        chai.request(app)
        .post('/users')
        .send(user)
        .end((err, response) => {
            response.should.have.status(201);
            response.body.should.be.a('object');
            response.body.should.have.property('user').property('name').eq(user.name);
            response.body.should.have.property('user').property('email').eq(user.email);
            response.body.should.have.property('user').property('role').eq('user');
            response.body.should.have.property('user').property('_id');
            done();
        });
    });

    it ('Insertion of admin user directly into the database for the tests below', async () => {
        connection = await MongoClient.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = connection.db('Cookmaster');
        const users = { name: 'admin', email: 'admin@admin.com', password: 'admin', role: 'admin' };
        await db.collection('users').insertOne(users);
    });
});
