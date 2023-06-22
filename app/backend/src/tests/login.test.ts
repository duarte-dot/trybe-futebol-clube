import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import * as loginMock from './mocks/LoginMock';

import * as utils from '../utils/auth';

import * as loginService from '../services/loginServices';
import UsersModel from '../database/models/UsersModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota /login', function () {
  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
    sinon.restore();
  });

  it('retorna erro com o campo de email inválido', async function () {
    const httpResponse = await chai.request(app).post('/login').send(loginMock.invalidEmailLogin);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password'});
  });

  it('retorna erro com o campo de senha inválida', async function () {
    const httpResponse = await chai.request(app).post('/login').send(loginMock.invalidPasswordLogin);

    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password'});
  });

  it('testa se com um login correto, retorna um token', async () => {
    sinon.stub(UsersModel, 'findOne').resolves(null)
    sinon.stub(utils, 'generateToken').resolves('token')
    sinon.stub(loginService, 'login').resolves({ status: 200, token: 'token' })
    
    const httpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    })

    expect(httpResponse.body).to.be.deep.equal({ token: 'token'});
    expect(httpResponse.status).to.be.equal(200);
  });

  it('testa o funcionamento correto da rota /login/role', async () => {
    sinon.stub(utils, 'validateToken').resolves({ email: 'gabrieldvr@outlook.com', role: 'admin' })
    sinon.stub(loginService, 'role').resolves({ status: 200, role: 'admin' })

    const httpResponse = await chai.request(app).get('/login/role').set('Authorization', 'token')

    expect(httpResponse.body).to.be.deep.equal({ role: 'admin'});
  })

  it('testa se não tiver um token, retorna um erro', async () => {
    sinon.stub(utils, 'validateToken').resolves(null)
    sinon.stub(loginService, 'role').resolves({ status: 401, message: 'Token must be a valid token' })

    const httpResponse = await chai.request(app).get('/login/role')

    expect(httpResponse.body).to.be.deep.equal({ message: 'Token not found'});
  })

  it('testa se não tiver um token, retorna um erro', async () => {
    sinon.stub(utils, 'validateToken').resolves(null)
    sinon.stub(loginService, 'role').resolves({ status: 401, message: 'Token must be a valid token' })

    const httpResponse = await chai.request(app).get('/login/role').set('Authorization', 'aaaaaaaaa')

    expect(httpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token'});
  })
});
