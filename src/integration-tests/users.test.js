const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');

chai.use(chaiHttp);
chai.should();

describe('Routes Users', () => {
    describe('POST /users', () => {
        it ('Should not register a new user without NAME field.', done => {
            const user = {
                email: 'thiago.gou@gmail.com',
                password: '12345678'
            };

            chai.request(app)
            .post('/users')
            .send(user)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
        }); 
        
        it ('Should not register a new user without EMAIL field.', done => {
            const user = {
                name: 'Thiago Gualberto',
                password: '12345678'
            };

            chai.request(app)
            .post('/users')
            .send(user)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
        });

        it ('Should not register a new user without PASSWORD field.', done => {
            const user = {
                name: 'Thiago Gualberto',
                email: 'thiago.gou@gmail.com',
            };

            chai.request(app)
            .post('/users')
            .send(user)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
        });

        it ('Should not register a user with an email already registered.', done => {
            const user = {
                name: 'Thiago Gualberto',
                email: 'thiago.gou@gmail.com',
                password: '12345678'
            };

            chai.request(app)
            .post('/users')
            .send(user)
            .end((err, response) => {
                response.should.have.status(409);
                done();
            });
        });        
    });
    describe('POST /users/admin', () => {
        let token = '';
        
        it ('Should not login ADMIN without EMAIL field.', done => {
            const user = {                
                password: 'admin'
            };

            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(401);                
                done();
            });
        });

        it ('Should not login ADMIN without PASSWORD field.', done => {
            const user = {
                email: 'admin@admin.com'
            };

            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(401);                
                done();
            });
        });

        it ('Should not login ADMIN with invalid EMAIL.', done => {
            const user = {
                email: 'admin@',
                password: 'admin'
            };

            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(401);                
                done();
            });
        });

        it ('Should not login ADMIN user that does not exist.', done => {
            const user = {
                email: 'naoexiste@admin.com',
                password: 'admin'
            };

            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(401);                
                done();
            });
        });
        
        it ('Should login ADMIN user', done => {
            const user = {
                email: 'admin@admin.com',
                password: 'admin'
            };

            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('token');
                token = response.body.token;
                done();
            });
        });

        it ('Should not register a new user ADMIN without NAME field.', done => {
            const user = {
                email: 'adminnovo@adminnovo.com',
                password: 'adminnovo'
            };

            chai.request(app)
            .post('/users/admin')
            .set('Authorization', token)
            .send(user)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
        }); 

        it ('Should not register a new user ADMIN without EMAIL field.', done => {
            const user = {
                name: 'admin novo',
                password: 'adminnovo'
            };

            chai.request(app)
            .post('/users/admin')
            .set('Authorization', token)
            .send(user)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
        });

        it ('Should not register a new user ADMIN without PASSWORD field.', done => {
            const user = {
                name: 'admin novo',
                email: 'adminnovo@adminnovo.com'
            };

            chai.request(app)
            .post('/users/admin')
            .set('Authorization', token)
            .send(user)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
        });

        it ('Should not register a user ADMIN with an email already registered.', done => {
            const user = {
                name: 'admin',
                email: 'admin@admin.com',
                password: 'admin'
            };

            chai.request(app)
            .post('/users/admin')
            .set('Authorization', token)
            .send(user)
            .end((err, response) => {
                response.should.have.status(409);
                done();
            });
        });

        it ('Admin user should not register a new admin user without being authenticated.', done => {
            const user = {
                name: 'admin novo',
                email: 'adminnovo@adminnovo.com',
                password: 'adminnovo'
            };

            chai.request(app)
            .post('/users/admin')
            .send(user)
            .end((err, response) => {
                response.should.have.status(401);
                done();
            });
        });

        it ('Admin user should register a new ADMIN user.', done => {
            const user = {
                name: 'admin novo',
                email: 'adminnovo@adminnovo.com',
                password: 'adminnovo'
            };

            chai.request(app)
            .post('/users/admin')
            .set('Authorization', token)
            .send(user)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('user').property('name').eq(user.name);
                response.body.should.have.property('user').property('email').eq(user.email);
                response.body.should.have.property('user').property('role').eq('admin');
                response.body.should.have.property('user').property('_id');
                done();
            });
        });

        it ('Should login COMMOM user', done => {
            const user = {
                email: 'thiago.gou@gmail.com',
                password: '12345678'
            };

            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('token');
                token = response.body.token;
                done();
            });
        });

        it ('Commom user should not register a new ADMIN user.', done => {
            const user = {
                name: 'admin novo',
                email: 'adminnovo@adminnovo.com',
                password: 'adminnovo'
            };

            chai.request(app)
            .post('/users/admin')
            .set('Authorization', token)
            .send(user)
            .end((err, response) => {
                response.should.have.status(403);
                done();
            });
        });
    });
});