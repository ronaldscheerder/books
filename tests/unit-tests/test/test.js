// Load configuration

var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json');

var should = require('should'),
    supertest = require('supertest');

describe('API Routing for CRUD operations on books', function () {

    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path + "/");

    var tmpBookId = null;
    var tmpBookResponse;

    before(function (done) {
       done();
    });

    describe('CREATE book', function () {
        it('Should POST /books', function (done) {
            request
                .post('/books')
                .send({
                    "title": "Great book!" + Date.now(),
                    "author": "John Doe",
                    "description":"Lorem ipsum, blablabla"
                })
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'utf-8')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('create');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    res.type.should.be.exactly('application/json');
                    res.charset.should.be.exactly('utf-8');

                    tmpBookId = JSON.parse(res.text).doc._id;
                    done();
                });
        });
    });

    describe('RETRIEVE all books', function () {
        it('Should GET /books', function (done) {
            request
                .get('/books')
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'utf-8')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);
                    tmpBookResponse = res.text;
                    done();
                });
        });
    });

    describe('RETRIEVE 1 book', function () {
        it('Should GET /books/{id}', function (done) {
            request
                .get('/books/{id}' + tmpBookId)
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'utf-8')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('detail');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 book', function () {
        it('Should PUT /books/{id}', function (done) {
            request
                .put('/books/' + tmpBookId)
                .send({
                    "doc": {
                        "title": "The Best book!" + Date.now(),
                        "author": "Ronald Scheerder",
                        "description": "Book is updated."
                    }
                })
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'utf-8')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('update');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('DELETE 1 book', function () {
        it('Should DELETE /books/{id}', function (done) {
            request
                .del('/books/' + tmpBookId)
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'utf-8')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('delete');
                    JSON.parse(res.text).should.have.property('doc').and.have.property('ok').be.exactly(1);
                    JSON.parse(res.text).should.have.property('doc').and.have.property('n').be.exactly(1);
                    JSON.parse(res.text).should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('RETRIEVE all books to verify that the original collection is restored.', function () {
        it('Should GET /books', function (done) {
            request
                .get('/books')
                .expect(200)
                .expect('Content-Type', /application.json/)
                .expect('Content-Type', 'utf-8')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);
                    tmpBookResponse = res.text;
                    done();
                });
        });
    });
});


