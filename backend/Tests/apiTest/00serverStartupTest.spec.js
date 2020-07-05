/**
 * @fileoverview Unit test for server startup tests
 * @access No Token required
 */

let chai = require('chai'),
chaiHttp = require('chai-http'),
should = require('chai').should(),
app = require('../../testServer');

chai.use(chaiHttp);
describe('Basic server tests', () => {
    it('API should return 404 when hitting an unknown API', (done)=> {
        chai.request(app)
            .get('/book')
            .end((err, res)=> {
                res.should.have.status(404);
            done();
        })
    })

    it('API should return 422 on hitting an known route', (done)=> {
        chai.request(app)
            .post('/api/auth/register')
            .end((err, res)=> {
                res.should.have.status(422);
            done();
        })
    })
})