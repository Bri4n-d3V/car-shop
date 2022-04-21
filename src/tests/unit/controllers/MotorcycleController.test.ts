import chai from 'chai';
import Sinon from 'sinon';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import MotorcycleController from '../../../controllers/MotorcycleController';
import { badMotorcycleMock, motorcycleListMock, motorcycleMock } from '../mocks/MotorcycleMock';
import chaiHttp = require('chai-http');
import server from '../../../server';

const { expect } = chai;

chai.use(chaiHttp);
const app = server.getApp();

describe('CarController', (): void => {
  let motorcycleModel = new MotorcycleModel();
  let motorcycleService = new MotorcycleService(motorcycleModel);
  new MotorcycleController(motorcycleService);

  describe('#create', (): void => {
    before(() => Sinon.stub(motorcycleModel.model, 'create').resolves(motorcycleMock));

    after((): void => Sinon.restore());

    it('return the created car', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .post(`/motorcycles`).send(motorcycleMock);

      expect(chaiHttpResponse.body).to.be.deep.equal(motorcycleMock);
    })

    it('return the status 400 due bad request body', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .post(`/motorcycles`).send(badMotorcycleMock);

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.not.be.equal(motorcycleMock);
    })
  })

  describe('#read', (): void => {
    before(() => Sinon.stub(motorcycleModel.model, 'find').resolves(motorcycleListMock as any));

    after((): void => Sinon.restore());

    it('return all the motorcycles', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .get(`/motorcycles`).send();

      expect(chaiHttpResponse.body).to.be.deep.equal(motorcycleListMock);
    })
  })

  describe('#readOne', () => {
    before(async () => {
      Sinon.stub(motorcycleModel.model, 'findOne')
        .onCall(0).resolves(motorcycleMock as any)
        .onCall(1).resolves(null)
    });

    after((): void => Sinon.restore());

    it('return a car by id when success', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .get(`/motorcycles/${motorcycleMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(motorcycleMock);
    });

    it('return error 400 due bad id request param', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .get(`/motorcycles/bad id`).send();

      const error = {
        "error": "Id must have 24 hexadecimal characters"
      }

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error);
    });

    it('return error 400 due non-existent id request param', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .get(`/motorcycles/${motorcycleMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body.error).to.be.equal('Object not found');
    });
  })

  describe('#update', (): void => {
    before(() =>
      Sinon.stub(motorcycleModel.model, 'findByIdAndUpdate')
        .onCall(0).resolves(motorcycleMock as any)
        .onCall(1).resolves(null));

    after((): void => Sinon.restore());

    it('return the car with the updated values', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .put(`/motorcycles/${motorcycleMock._id}`).send(motorcycleMock);

      expect(chaiHttpResponse.body).to.be.deep.equal(motorcycleMock);
    })

    it('return error 400 due bad id request param', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .put(`/motorcycles/bad id`).send();

      const error = {
        "error": "Id must have 24 hexadecimal characters"
      }

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error);
    });

    it('return error 400 due non-existent id request param', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .put(`/motorcycles/${motorcycleMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body.error).to.be.equal('Object not found');
    });
  })

  describe('#delete', () => {
    before(async () => {
      Sinon.stub(motorcycleModel.model, 'findByIdAndDelete')
        .onCall(0).resolves(motorcycleMock as any)
        .onCall(1).resolves()
    });

    after((): void => Sinon.restore());

    it('delete car (status 204 and no body return)', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .delete(`/motorcycles/${motorcycleMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(204);
      expect(chaiHttpResponse.body).to.be.empty;
    });

    it('return error 400 due bad id request param', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .delete(`/motorcycles/bad id`).send();

      const error = {
        "error": "Id must have 24 hexadecimal characters"
      }

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error);
    });

    it('return error 400 due non-existent id request param', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .delete(`/motorcycles/${motorcycleMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body.error).to.be.equal('Object not found');
    });
  })
})
