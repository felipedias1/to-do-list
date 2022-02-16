const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../../../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /api/users', () => {
	describe('when insert new user with success', () => {
		let response = {};
		const DBServer = new MongoMemoryServer();

		before(async () => {

			const URLMock = await DBServer.getUri();
			const connectionMock = await MongoClient.connect(URLMock,
				{ useNewUrlParser: true, useUnifiedTopology: true }
			);

			sinon.stub(MongoClient, 'connect')
				.resolves(connectionMock);
			
			response = await chai.request(server)
				.post('/user')
				.send({
					name: "usertest", 
					email: "test@test.com",
					password: "test12345"
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

		it('object have "token" property', () => {
			expect(response.body).to.have.property('token');
		});

		it('type of property token is string', () => {
			expect(response.body.token).to.be.a('string');
		});
	});
});
