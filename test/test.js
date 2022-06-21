let chai = require('chai')
let chaiHttp = require('chai-http');
const { describe, it } = require('mocha');

let should = chai.should();
chai.use(chaiHttp);

let server = require('../app')


describe('Calculator', () => {
    describe('/GET admin/input-details', () => {
        it('it should GET all the population details from user', done => {
            chai.request(server)
                .get('/admin/input-details')
                .end((err, res) => {
                    if (err) done (err);
                    (res).should.have.status(200);
                    done();
                })
        })
    })

    describe('/GET result home page', () => {
        it('it shoud GET the calculated result', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    if (err) done (err);
                    (res).should.have.status(200);
                    done();
                })
        })
    })

    // describe('/POST benefits', () => {
    //     it('it should responsd with redirect on post', (done) => {
    //         chai.request(server)
    //             .post('/admin/benefits')
    //             .end((err, res) => {
    //                 if (err) done (err);
    //                 (res).should.have.status(200);
    //                 (res.body).should.have.property('detail')
    //                 done();
    //             })
    //     })
    // })
})