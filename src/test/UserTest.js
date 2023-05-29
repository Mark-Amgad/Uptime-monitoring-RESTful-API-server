const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../server"); // Your Express app instance

chai.use(chaiHttp);
//const expect = chai.expect;
const assert = require('chai').assert

describe('Users APIs', () => {
    describe('POST /signup', () => {
      let email;
      afterEach((done) => {
        chai
          .request(app)
          .delete(`/users/delete/${email}`)
          .end((err, res) => {
            done();
          });
      });

      it('status:200 - new user created', (done) => {
        chai
          .request(app)
          .post('/users/signup')
          .send({ email: 'markamgad20231@gmail.com', password: '1234',phone:"01289928409",name:"Ahmed" })
          .end((err, res) => {
            assert.equal(res.status,200);
            assert.property(res.body,"message");
            assert.equal(res.body.message,"user created");
            email = "markamgad20231@gmail.com";
            done();
          });
      }).timeout(10000);


      it('status:404 - missing data', (done) => {
        chai
          .request(app)
          .post('/users/signup')
          .send({ email: 'markamgad20231@gmail.com', phone:"01289928409",name:"Ahmed" })
          .end((err, res) => {
            assert.equal(res.status,404);
            email = "markamgad20231@gmail.com";
            done();
          });
      }).timeout(10000);


      it('status:404 - email already exist', (done) => {
        chai
          .request(app)
          .post('/users/signup')
          .send({ email: 'markamgad5@gmail.com',password:"1234", phone:"01289928409",name:"Ahmed" })
          .end((err, res) => {
            assert.equal(res.status,404);
            email = "markamgad20231@gmail.com";
            done();
          });
      }).timeout(10000);
    });



    describe('POST /login', () => {
      
      

      it('status:200 - logged in successfully', (done) => {
        chai
          .request(app)
          .post('/users/login')
          .send({ email: 'markamgad5@gmail.com', password: '1234'})
          .end((err, res) => {
            assert.equal(res.status,200);
            assert.property(res.body,"message");
            assert.property(res.body,"token");
            assert.equal(res.body.message,"Success login");
            done();
          });
      }).timeout(10000);

      it('status:404 - Wrong password', (done) => {
        chai
          .request(app)
          .post('/users/login')
          .send({ email: 'markamgad5@gmail.com', password: '12345'})
          .end((err, res) => {
            assert.equal(res.status,404);
            assert.property(res.body,"message");
            assert.equal(res.body.message,"Wrong password");
            done();
          });
      }).timeout(10000);


      it('status:404 - not verified account', (done) => {
        chai
          .request(app)
          .post('/users/login')
          .send({ email: 'markamgad8@gmail.com', password: '1234'})
          .end((err, res) => {
            assert.equal(res.status,404);
            assert.property(res.body,"message");
            assert.equal(res.body.message,"This user is not verified yet, please check your email.");
            done();
          });
      }).timeout(10000);



    });
  
    /*
    describe('POST /login', () => {
      it('should authenticate and return a token', (done) => {
        chai
          .request(app)
          .post('/login')
          .send({ username: 'testuser', password: 'testpass' })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            // You can add more assertions as per your application's response structure
            done();
          });
      });
    });
    */
  });
  