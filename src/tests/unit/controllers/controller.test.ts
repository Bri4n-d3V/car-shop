import chai from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock, carListMock } from '../mocks/CarMock';
import chaiHttp = require('chai-http');
import server from '../../../server';

const { expect } = chai;

chai.use(chaiHttp);
const app = server.getApp();

describe('CarController', (): void => {
  let carModel= new CarModel();
  let carService= new CarService(carModel);
  new CarController(carService);

  describe('#create', (): void => {
    before(() => Sinon.stub(carModel.model, 'create').resolves(carMock));

    after((): void => Sinon.restore());

    it('return the created car', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
      .post(`/cars`).send(carMock);

      expect(chaiHttpResponse.body).to.be.deep.equal(carMock);
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

  describe('#readOne', (): void => {
    before(() => Sinon.stub(carModel.model, 'findOne').resolves(carMock as any));

    after((): void => Sinon.restore());

    it('return a car by id', async (): Promise<void> => {
      const chaiHttpResponse = await chai.request(app)
      .get(`/cars/${carMock._id}`).send();

      expect(chaiHttpResponse.body).to.be.deep.equal(carMock);
    })
  })
})
