const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('DELETE /task/:id', () => {
	describe('when user delete one Task with success', () => {
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
        .delete(`/task/${responseTask.body._id}`)
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

		it('return status code 204', () => {
			expect(response).to.have.status(204);
		});

	});

  describe('when task id is invalid', () => {
		let response = {};
		const DBServer = new MongoMemoryServer();

		before(async () => {
      const wrongId = '620e6cdb1b38g3c614650eab'

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
        .delete(`/task/${wrongId}`)
        .set('authorization', userResponse.body.token)
		});

		after(async () => {
			MongoClient.connect.restore();
			await DBServer.stop();
		});

		it('return status code 500', () => {
			expect(response).to.have.status(500);
		});

    it('return an object', () => {
			expect(response.body).to.be.a('object');
		});

    it('object have "message" property', () => {
      expect(response.body).to.have.property('message');
		});
    
	});

});