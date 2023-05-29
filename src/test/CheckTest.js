const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../server"); // Your Express app instance

chai.use(chaiHttp);
//const expect = chai.expect;
const assert = require('chai').assert

  
describe('Check APIs', () => {
    describe('GET /checks', () => {
      it('status:200 && all checks are returned', (done) => {
        chai
          .request(app)
          .get('/checks')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmthbWdhZDVAZ21haWwuY29tIiwicGhvbmUiOiIwMTI4OTkyODQwOSIsImlhdCI6MTY4NTM2ODQzN30.W7sjpMRnFx5Hfw2Pif9jatg7DuOR3n0beDRnebf4AIk')
          .end((err, res) => {
            assert.equal(res.status,200);
            assert.property(res.body,"checks");
            /*
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("checks");
            expect(res.body.checks).to.be.an('array');
            */
            done();
          });
      }).timeout(5000);

      it('status:404 && Not Authenticated User', (done) => {
        chai
          .request(app)
          .get('/checks')
          .end((err, res) => {
            assert.equal(res.status,404);
            assert.property(res.body,"message");
            assert.equal(res.body.message,"Not Authenticated User");
            done();
          });
      }).timeout(5000);
    });


    describe('Post /checks/add', () => {
      let addedCheckId;
      afterEach((done) => {
        chai
          .request(app)
          .delete(`/checks/delete/${addedCheckId}`)
          .end((err, res) => {
            done();
          });
      });


      it('status:200 && Check added', (done) => {
        chai
          .request(app)
          .post('/checks/add')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmthbWdhZDVAZ21haWwuY29tIiwicGhvbmUiOiIwMTI4OTkyODQwOSIsImlhdCI6MTY4NTM2ODQzN30.W7sjpMRnFx5Hfw2Pif9jatg7DuOR3n0beDRnebf4AIk')
          .send({
            "email": "markamgad5@gmail.com",
            "urlName" : "My server",
            "url" : "localhost:8080/test",
            "protocol" : "http",
            "ignoreSSLFlag" : true
          })
          .end((err, res) => {
            assert.equal(res.status,200);
            assert.property(res.body,"message");
            assert.property(res.body,"URLCheck");
            assert.typeOf(res.body.URLCheck,"object");
            addedCheckId = res.body.URLCheck._id// to delete it after testing
            done();
          });
      }).timeout(5000);

      it('status:404 && missing data', (done) => {
        chai
          .request(app)
          .post('/checks/add')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmthbWdhZDVAZ21haWwuY29tIiwicGhvbmUiOiIwMTI4OTkyODQwOSIsImlhdCI6MTY4NTM2ODQzN30.W7sjpMRnFx5Hfw2Pif9jatg7DuOR3n0beDRnebf4AIk')
          .send({
            "email": "markamgad5@gmail.com",
            "url" : "localhost:8080/test",
            "protocol" : "http",
            "ignoreSSLFlag" : true
          })
          .end((err, res) => {
            assert.equal(res.status,404);
            assert.property(res.body,"message");
            done();
          });
      }).timeout(5000);

      it('status:404 && Not Authenticated User', (done) => {
        chai
          .request(app)
          .post('/checks/add')
          .send({
            "email": "markamgad5@gmail.com",
            "url" : "localhost:8080/test",
            "protocol" : "http",
            "ignoreSSLFlag" : true
          })
          .end((err, res) => {
            assert.equal(res.status,404);
            assert.property(res.body,"message");
            assert.equal(res.body.message,"Not Authenticated User");
            done();
          });
      }).timeout(5000);
    });


    describe("Get /getByEmail",()=>{
      it("status 200 and checks available",(done)=>{
        chai.request(app)
        .get("/checks/markamgad5@gmail.com")
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmthbWdhZDVAZ21haWwuY29tIiwicGhvbmUiOiIwMTI4OTkyODQwOSIsImlhdCI6MTY4NTM2ODQzN30.W7sjpMRnFx5Hfw2Pif9jatg7DuOR3n0beDRnebf4AIk')
        .end((err,res)=>{
          assert.equal(res.status,200);
          assert.property(res.body,"checks");
          done();
        });
      }).timeout(5000);


      it("status 404 - wrnog email",(done)=>{
        chai.request(app)
        .get("/checks/markamgad20132@gmail.com")
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmthbWdhZDVAZ21haWwuY29tIiwicGhvbmUiOiIwMTI4OTkyODQwOSIsImlhdCI6MTY4NTM2ODQzN30.W7sjpMRnFx5Hfw2Pif9jatg7DuOR3n0beDRnebf4AIk')
        .end((err,res)=>{
          assert.equal(res.status,404);
          assert.property(res.body,"message");
          done();
        });
      }).timeout(5000);

      it('status:404 && Not Authenticated User', (done) => {
        chai
          .request(app)
          .get('/checks/markamgad5@gmail.com')
          .end((err, res) => {
            assert.equal(res.status,404);
            assert.property(res.body,"message");
            assert.equal(res.body.message,"Not Authenticated User");
            done();
          });
      }).timeout(5000);
    });

});
  