const frisby = require('frisby');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');

chai.use(chaiHttp);
chai.should();

describe('Routes Recipes', () => {
    var token = '';
    var tokenSecondUser = '';
    var id = '';

    describe('POST /login', () => {
        it ('Should login to the application.', done => {
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
    });

    describe('POST /recipes', () => {
        it ('Should not register new recipe without NAME field.', done => {
            const recipe = {
                ingredients: 'Frango',
                preparation: '10 min no forno',
            };

            chai.request(app)
            .post('/recipes')
            .set('Authorization', token)
            .send(recipe)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
        });
        it ('Should not register new recipe without INGREDIENTS field.', done => {
            const recipe = {
                ingredients: 'Frango',
                preparation: '10 min no forno',
            };

            chai.request(app)
            .post('/recipes')
            .set('Authorization', token)
            .send(recipe)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
        });
        it ('Should not register new recipe without PREPARATION field.', done => {
            const recipe = {
                name: 'Frango do jacquin',
                ingredients: 'Frango',
            };

            chai.request(app)
            .post('/recipes')
            .set('Authorization', token)
            .send(recipe)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
        });
        it ('Should not register new recipe without auth token.', done => {
            const recipe = {
                name: 'Frango do jacquin',
                ingredients: 'Frango',
                preparation: '10 min no forno',
            };

            chai.request(app)
            .post('/recipes')            
            .send(recipe)
            .end((err, response) => {
                response.should.have.status(401);
                done();
            });
        }); 
        it ('Should not register new recipe with token malformed.', done => {
            const recipe = {
                name: 'Frango do jacquin',
                ingredients: 'Frango',
                preparation: '10 min no forno',
            };

            chai.request(app)
            .post('/recipes')
            .set('Authorization', {})
            .send(recipe)
            .end((err, response) => {
                response.should.have.status(401);
                done();
            });
        });
        it ('Should register a new recipe.', done => {
            const recipe = {
                name: 'Frango do jacquin',
                ingredients: 'Frango',
                preparation: '10 min no forno',
            };

            chai.request(app)
            .post('/recipes')
            .set('Authorization', token)
            .send(recipe)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('recipe').property('name').eq(recipe.name);
                response.body.should.have.property('recipe').property('ingredients').eq(recipe.ingredients);
                response.body.should.have.property('recipe').property('preparation').eq(recipe.preparation);
                response.body.should.have.property('recipe').property('userId');
                response.body.should.have.property('recipe').property('_id');
                id = response.body.recipe._id;
                done();
            });
        });
    });
    
    describe('GET /recipes', () => {
        it ('Should list all recipes.', done => {
            chai.request(app)
            .get('/recipes')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();
            });
        }); 
    });
    
    describe('GET /recipes/:id', () => {
        it ('Should not list a single recipe with invalid ID.', done => {
            chai.request(app)
            .get(`/recipes/777`)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
        });
        it ('Should not list a recipe that does not exist.', done => {
            const objId = new mongoose.Types.ObjectId();
            
            chai.request(app)
            .get(`/recipes/${objId}`)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
        });
        it ('Should list a single recipe.', done => {
            chai.request(app)
            .get(`/recipes/${id}`)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('ingredients');
                response.body.should.have.property('preparation');
                response.body.should.have.property('userId');
                response.body.should.have.property('_id');
                done();
            });
        });
    });

    describe('PUT /recipes/:id', () => {
        it ('Should not updated a recipe that does not exist.', done => {
            chai.request(app)
            .put(`/recipes/61b275566c610c33447789c6`)
            .set('Authorization', token)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
        });
        it ('Should update a recipe.', done => {
            const recipe = {
                name: 'Frango do jacquin atualizado',
                ingredients: 'Frango  atualizado',
                preparation: '10 min no forno atualizado',
            };

            chai.request(app)
            .put(`/recipes/${id}`)
            .set('Authorization', token)
            .send(recipe)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('ingredients');
                response.body.should.have.property('preparation');
                response.body.should.have.property('userId');
                response.body.should.have.property('_id');
                done();
            });
        }); 
        it ('Should login another user with user role. ', done => {
            const user = {
                email: 'diego@gmail.com',
                password: '12345678'
            };

            chai.request(app)
            .post('/login')
            .send(user)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('token');
                tokenSecondUser = response.body.token;
                done();
            });
        });
        it ('Authenticated user with user role wants to update another user recipe and should not be able to.', done => {
            const recipe = {
                name: 'Frango do jacquin atualizado',
                ingredients: 'Frango  atualizado',
                preparation: '10 min no forno atualizado',
            };

            chai.request(app)
            .put(`/recipes/${id}`)
            .set('Authorization', tokenSecondUser)
            .send(recipe)
            .end((err, response) => {
                response.should.have.status(401);
                done();
            });
        });
    });

    describe('PUT /recipes/:id/image', () => {
        const photoFile = path.resolve(__dirname, '..', 'src', 'uploads', 'ratinho.jpg');
        const content = fs.createReadStream(photoFile);
        const formData = frisby.formData();

        formData.append('image', content);

        it ('Should not updated a recipe that does not exist.', done => {
            chai.request(app)
            .put(`/recipes/61b275566c610c33447789c6/image`, { body: formData })
            .set('Authorization', token)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
        });
        it ('Authenticated user with user role wants to insert/update another user recipe image and should not be able to.', done => {
            chai.request(app)
            .put(`/recipes/${id}/image`, { body: formData })
            .set('Authorization', tokenSecondUser)
            .end((err, response) => {
                response.should.have.status(401);
                done();
            });
        });
        it ('Should insert an image in a recipe.', done => {            
            chai.request(app)
            .put(`/recipes/${id}/image`, { body: formData })
            .set('Authorization', token)            
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('name');
                response.body.should.have.property('ingredients');
                response.body.should.have.property('preparation');
                response.body.should.have.property('userId');
                response.body.should.have.property('image');
                done();
            });
        });
    });

    describe('DELETE /recipes/:id', () => {
        it ('Should not remove a recipe that does not exist.', done => {
            chai.request(app)
            .delete(`/recipes/61b275566c610c33447789c6`)
            .set('Authorization', token)
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
        });
        it ('Authenticated user with user role wants to delete another user recipe and should not be able to.', done => {
            chai.request(app)
            .delete(`/recipes/${id}`)
            .set('Authorization', tokenSecondUser)
            .end((err, response) => {
                response.should.have.status(401);
                done();
            });
        });
        it ('Should remove a recipe.', done => {
            chai.request(app)
            .delete(`/recipes/${id}`)
            .set('Authorization', token)
            .end((err, response) => {
                response.should.have.status(204);
                done();
            });
        });
    });
});