const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../server"); // Your Express app instance

chai.use(chaiHttp);
const expect = chai.expect;

describe('User APIs', () => {
    describe('POST /signup', () => {
      it('should create a new user', (done) => {
        chai
          .request(app)
          .post('/users/signup')
          .send({ email: 'markamgad9@gmail.com', password: '1234',phone:"01289928409","name":"Ahmed" })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('user created');
            done();
          });
      });
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
  