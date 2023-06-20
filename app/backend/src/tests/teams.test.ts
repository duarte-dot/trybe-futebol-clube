// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import * as teamsMock from './mocks/TeamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota /teams', function () {
  it('retorna todos os times', async function () {
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(teamsMock.allTeams);
  });
});
