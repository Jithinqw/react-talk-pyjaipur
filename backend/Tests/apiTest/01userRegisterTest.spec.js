/**
 * @fileoverview API test for user register tests
 * @access No token required
 */

let chai = require('chai'),
chaiHttp = require('chai-http'),
should = require('chai').should(),
faker = require('faker'),
app = require('../../testServer');

chai.use(chaiHttp);

describe('User register API tests - Basic tests', () => {
    it('Check if such API exist - API should not return a 404', (done)=> {
        chai.request(app)
            .post('/api/auth/register')
            .end((err, res)=> {
                chai.assert.notEqual(res.status, 404)
            done();
        })
    })
    it('Check if such API exist - API should return a 404', (done)=> {
        chai.request(app)
            .get('/api/auth/register')
            .end((err, res)=> {
                chai.assert.equal(res.status, 404);
            done();
        })
    })
})

describe('User validation unit test', ()=> {
    it('User should not able able to register without providing required fields', (done)=> {
        chai.request(app)
            .post('/api/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            })
            .end((err, res)=> {
                chai.assert.equal(res.status, 422);
            done();
        })
    })

    it('User should not able able to register without providing a name field', (done)=> {
        chai.request(app)
            .post('/api/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                firstName: '',
                lastName: '',
                email: 'jithin@gmail.com',
                password: 'Jithinww23323!',
            })
            .end((err, res)=> {
                chai.assert.equal(res.status, 422);
                chai.assert.equal(res.text, '"Invalid parameters provided. Please provide valid parameters."')
            done();
        })
    })

    it('User should not able able to register without providing a valid name field', (done)=> {
        chai.request(app)
            .post('/api/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                firstName: 'j',
                lastName: '',
                email: 'jithin@gmail.com',
                password: 'Jithinww23323!',
            })
            .end((err, res)=> {
                chai.assert.equal(res.status, 422);
            done();
        })
    })

    it('User should not be able to register without providing a valid email field', (done)=> {
        chai.request(app)
            .post('/api/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                firstName: 'Jithin',
                lastName: '',
                email: 'j',
                password: 'Jithin13w33!',
            }).end((err, res)=> {
                chai.assert.equal(res.status, 422);
                done();
            })
    })
    
    it('User should not be able to register without providing a valid password field', (done)=> {
        chai.request(app)
            .post('/api/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                firstName: 'Jithin',
                lastName: '',
                email: 'jithin@gmail.com',
                password: 'Ji!',
            }).end((err, res)=> {
                chai.assert.equal(res.status, 422);
                done();
            })
    })
})

describe('Unit test working version', ()=> {
    it("The user should be able to register using valid parameters", (done)=> {
        chai.request(app)
            .post('/api/auth/register')
            .set('Content-Type', 'application/json')
            .send({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: "Jithin3!",
            }).end((err, res)=> {
                // console.log(res)
                chai.assert.equal(res.status, 201);
                done();
            })
    })
})