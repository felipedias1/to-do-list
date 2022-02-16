const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /task', () => {
	describe('when user get allTasks with success', () => {
		let response = {};
		const DBServer = new MongoMemoryServer();

		before(async () => {

			const URLMock = await DBServer.getUri();
			const connectionMock = await MongoClient.connect(URLMock,
				{ useNewUrlParser: true, useUnifiedTopology: true }
			);

			sinon.stub(MongoClient, 'connect')
				.resolves(connectionMock);

      userResponse = await chai.request(server)
      .post('/user')
      .send({
        name: "usertest", 
        email: "test@test.com",
        password: "test12345"
      })
			
			responseTask = await chai.request(server)
				.post('/task')
        .set('authorization', userResponse.body.token)
				.send({
					text: "test task", 
 	        status: "em andamento" 
				});

      response = await chai.request(server)
      .get('/task')
      .set('authorization', userResponse.body.token)
      .send({
        text: "test task", 
        status: "em andamento" 
      });
		});

		after(async () => {
			MongoClient.connect.restore();
			await DBServer.stop();
		});

		it('return status code 200', () => {
			expect(response).to.have.status(200);
		});

		it('return an array', () => {
			expect(response.body).to.be.a('array');
		});

    it('object have "_id","text", "status", "userId" and "date" properties', () => {
			expect(response.body[0]).to.have.property('_id');
      expect(response.body[0]).to.have.property('text');
      expect(response.body[0]).to.have.property('status');
      expect(response.body[0]).to.have.property('userId');
      expect(response.body[0]).to.have.property('date');
		});

	});

});