import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
const expect = chai.expect;
let should = chai.should();

chai.use(chaiHttp);

describe('/GET /files/data', () => {
  it('it should GET all the files parsed', (done) => {
    chai.request(server)
      .get('/files/data')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4);
        done();
      });
  });
});

describe('/GET /files/list', () => {
  it('it should GET all the files', (done) => {
    chai.request(server)
      .get('/files/list')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('files');
        done();
      });
  });
});