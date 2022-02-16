const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

describe('POST /users', () => {
	describe('quando é criado com sucesso', () => {
		let response = {};

		it('retorna o código de status 201', () => {
			expect(response).to.have.status(201);
		});

		it('retorna um objeto', () => {
			expect(response.body).to.be.a('object');
		});

		it('o objeto possui a propriedade "token"', () => {
			expect(response.body).to.have.property('token');
		});

		it('a propriedade "token" possui um token com 252 caracteres',
			() => {
				expect(response.body.token)
					.length.to.be.equal(252);
			});
	});
});