const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('PUT /task/:id', () => {
	describe('when user PUT one Task with success', () => {
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
        .put(`/task/${responseTask.body._id}`)
        .set('authorization', userResponse.body.token)
        .send({
          text: "test task update", 
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
        .put(`/task/${wrongId}`)
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

  describe('when property task.text in body is null', () => {
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
			
			response = await chai.request(server)
				.post('/task')
        .set('authorization', userResponse.body.token)
				.send({
          text: "test task", 
 	        status: "em andamento" 
				});

      response = await chai.request(server)
        .put(`/task/${responseTask.body._id}`)
        .set('authorization', userResponse.body.token)
        .send({ 
          status: "em andamento" 
        })
		});

		after(async () => {
			MongoClient.connect.restore();
			await DBServer.stop();
		});

		it('return status code 400', () => {
			expect(response).to.have.status(400);
		});

		it('return an object', () => {
			expect(response.body).to.be.a('object');
		});

		it('object have "message" property', () => {
      expect(response.body).to.have.property('message');
		});

		it('text in "message" property', () => {
      expect(response.body.message).to.be.equal("\"text\" is required");
		});
	});

  describe('when property task.status in body is null', () => {
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
			
			response = await chai.request(server)
				.post('/task')
        .set('authorization', userResponse.body.token)
				.send({ 
 	        text: "test task",
          status: "em andamento" 
				});

      response = await chai.request(server)
        .put(`/task/${responseTask.body._id}`)
        .set('authorization', userResponse.body.token)
        .send({
          text: "test task update", 
        })
		});

		after(async () => {
			MongoClient.connect.restore();
			await DBServer.stop();
		});

		it('return status code 400', () => {
			expect(response).to.have.status(400);
		});

		it('return an object', () => {
			expect(response.body).to.be.a('object');
		});

		it('object have "message" property', () => {
      expect(response.body).to.have.property('message');
		});

		it('text in "message" property', () => {
      expect(response.body.message).to.be.equal("\"status\" is required");
		});
	});

  describe('when property task.status is different of "pendente", "em andamento" or "pronto"', () => {
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
          status: "teste" 
				});

      response = await chai.request(server)
        .put(`/task/${responseTask.body._id}`)
        .set('authorization', userResponse.body.token)
        .send({
          text: "test task update", 
          status: "teste" 
        })
		});

		after(async () => {
			MongoClient.connect.restore();
			await DBServer.stop();
		});

		it('return status code 400', () => {
			expect(response).to.have.status(400);
		});

		it('return an object', () => {
			expect(response.body).to.be.a('object');
		});

		it('object have "message" property', () => {
      expect(response.body).to.have.property('message');
		});

		it('text in "message" property', () => {
      expect(response.body.message).to.be.equal("\"status\" must be one of [pendente, em andamento, pronto]");
		});
	});

});