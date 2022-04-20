import chai from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock, carListMock, badCarMock } from '../mocks/CarMock';
import chaiHttp = require('chai-http');
import server from '../../../server';

const { expect } = chai;

chai.use(chaiHttp);
const app = server.getApp();

describe('CarController', (): void => {
  let carModel = new CarModel();
  let carService = new CarService(carModel);
  new CarController(carService);

  describe('#create', (): void => {
    before(() => Sinon.stub(carModel.model, 'create').resolves(carMock));

    after((): void => Sinon.restore());

    it('return the created car', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .post(`/cars`).send(carMock);

      expect(chaiHttpResponse.body).to.be.deep.equal(carMock);
    })

    it('return the status 400 due bad request body', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .post(`/cars`).send(badCarMock);

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.not.be.equal(carMock);
    })
  })

  describe('#read', (): void => {
    before(() => Sinon.stub(carModel.model, 'find').resolves(carListMock as any));

    after((): void => Sinon.restore());

    it('return all the cars', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .get(`/cars`).send();

      expect(chaiHttpResponse.body).to.be.deep.equal(carListMock);
    })
  })

  describe('#readOne', () => {
    before(async () => {
      Sinon.stub(carModel.model, 'findOne')
        .onCall(0).resolves(carMock as any)
        .onCall(1).resolves(null)
    });

    after((): void => Sinon.restore());

    it('return a car by id when success', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .get(`/cars/${carMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(carMock);
    });

    it('return error 400 due bad id request param', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .get(`/cars/bad id`).send();

      const error = {
        "error": "Id must have 24 hexadecimal characters"
      }

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error);
    });

    it('return error 400 due non-existent id request param', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .get(`/cars/${carMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body.error).to.be.equal('Object not found');
    });
  })

  describe('#update', (): void => {
    before(() =>
      Sinon.stub(carModel.model, 'findByIdAndUpdate')
        .onCall(0).resolves(carMock as any)
        .onCall(1).resolves(null));

    after((): void => Sinon.restore());

    it('return the car with the updated values', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .put(`/cars/${carMock._id}`).send(carMock);

      expect(chaiHttpResponse.body).to.be.deep.equal(carMock);
    })

    it('return error 400 due bad id request param', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .put(`/cars/bad id`).send();

      const error = {
        "error": "Id must have 24 hexadecimal characters"
      }

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.deep.equal(error);
    });

    it('return error 400 due non-existent id request param', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
        .put(`/cars/${carMock._id}`).send();

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body.error).to.be.equal('Object not found');
    });
  })
})
