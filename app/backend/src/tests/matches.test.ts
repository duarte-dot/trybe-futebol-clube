// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import * as matchesMock from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota /matches', function () {
  it('retorna todas as partidas', async function () {
    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(matchesMock.allMatches);
  });

  it('retorna as partidas em progresso na rota /matches?inProgress=true', async function () {
    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(matchesMock.inProgressMatches);
  });

  it('retorna as partidas finalizadas na rota /matches?inProgress=false', async function () {
    const response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(matchesMock.finishedMatches);
  });
});
