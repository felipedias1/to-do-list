const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /task', () => {
	describe('when insert new task with success', () => {
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
		});

		after(async () => {
			MongoClient.connect.restore();
			await DBServer.stop();
		});

		it('return status code 201', () => {
			expect(response).to.have.status(201);
		});

		it('return an object', () => {
			expect(response.body).to.be.a('object');
		});

		it('object have "_id" and "message" property', () => {
			expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('message');
		});

		it('type of property "_id" and "message" are strings', () => {
			expect(response.body._id).to.be.a('string');
      expect(response.body.message).to.be.a('string');
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
 	        status: "em andamento" 
				});
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
				});
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
			
			response = await chai.request(server)
				.post('/task')
        .set('authorization', userResponse.body.token)
				.send({ 
          text: "test task", 
          status: "teste" 
				});
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