const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../server"); // Your Express app instance

chai.use(chaiHttp);
const expect = chai.expect;


  
describe('Check APIs', () => {
    describe('GET /checks', () => {
      it('should return all checks', (done) => {
        chai
          .request(app)
          .get('/checks')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("checks");
            expect(res.body.checks).to.be.an('array');
            // You can add more assertions as per your application's response structure
            done();
          });
      }).timeout(5000);
    });

});
  