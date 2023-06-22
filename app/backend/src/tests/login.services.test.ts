// @ts-ignore
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import { login, role } from '../services/loginServices';
import UsersModel from '../database/models/UsersModel';
import * as utils from '../utils/auth';

describe('Services - Testes para login e role', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('Deve retornar status 200 e um token válido ao fazer login com credenciais corretas', async () => {
    const findOneStub = sinon.stub(UsersModel, 'findOne');
    const bcryptStub = sinon.stub(bcrypt, 'compareSync');

    const mockUser = UsersModel.build({
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 10),
      role: 'user'
    });

    findOneStub.resolves(mockUser);
    bcryptStub.returns(true);

    const result = await login('test@example.com', 'password');

    expect(result).to.deep.equal({
      status: 200,
      token: utils.generateToken({email: mockUser.dataValues.email, role: mockUser.dataValues.role}), // substitua pelo valor esperado do token gerado
    });
  });

  it('Deve retornar status 401 e mensagem de erro ao fazer login com email inválido', async () => {
    const findOneStub = sinon.stub(UsersModel, 'findOne');

    findOneStub.resolves(null);

    const result = await login('invalid@example.com', 'password');

    expect(result).to.deep.equal({
      status: 401,
      message: 'Invalid email or password',
    });
  });

  it('Deve retornar status 401 e mensagem de erro ao fazer login com senha inválida', async () => {
    const findOneStub = sinon.stub(UsersModel, 'findOne');

    const mockUser = UsersModel.build({
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 10),
    });

    findOneStub.resolves(mockUser);

    const result = await login('test@example.com', 'wrong_password');

    expect(result).to.deep.equal({
      status: 401,
      message: 'Invalid email or password',
    });
  });

  it('Deve retornar status 200 e o papel do usuário ao chamar a função role com um token válido', async () => {
    const mockUser = {
      role: 'user',
    };

    sinon.stub(utils, 'validateToken').returns(mockUser);

    const authorization = 'valid_token';

    const result = await role(authorization);

    expect(result).to.deep.equal({
      status: 200,
      role: 'user',
    });
  });

  it('Deve retornar status 401 e mensagem de erro ao chamar a função role com um token inválido', async () => {
    sinon.stub(utils, 'validateToken').returns(false);

    const authorization = 'invalid_token';

    const result = await role(authorization);

    expect(result).to.deep.equal({
      status: 401,
      message: 'Token must be a valid token',
    });
  });
});
