// import * as sinon from 'sinon';
// import * as chai from 'chai';
// const request = require('supertest');
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';

// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

// import * as teamsMock from './mocks/TeamsMock';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('testando o app', () => {
//   /**
//    * Exemplo do uso de stubs com tipos
//    */

//   // let chaiHttpResponse: Response;

//   // before(async () => {
//   //   sinon
//   //     .stub(Example, "findOne")
//   //     .resolves({
//   //       ...<Seu mock>
//   //     } as Example);
//   // });

//   // after(()=>{
//   //   (Example.findOne as sinon.SinonStub).restore();
//   // })

//   // it('...', async () => {
//   //   chaiHttpResponse = await chai
//   //      .request(app)
//   //      ...

//   //   expect(...)
//   // });

//   describe('testando as rotas', () => {
//     it('testando a rota raiz /', async () => {
//       const httpResponse = await request(app).get('/')
//       expect(httpResponse.status).to.equal(200);
//       expect(httpResponse.body).to.be.an('object');
//       expect(httpResponse.body).to.be.deep.equal({ ok: true });
//     });

//     it('testando a rota /teams', async () => {
//       const httpResponse = await request(app).get('/teams')
//       expect(httpResponse.status).to.be.equal(200);
//       expect(httpResponse.body).to.be.an('array');
//       expect(httpResponse.body).to.be.deep.equal(teamsMock.allTeams)
//     });
//   });
// });
