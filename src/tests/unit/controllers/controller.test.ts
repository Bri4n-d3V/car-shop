import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock, carListMock } from '../mocks/CarMock';

describe('CarController', (): void => {
  let carModel= new CarModel();
  let carService= new CarService(carModel);
  let carController= new CarController(carService);

  describe('#create', (): void => {
    before(() => Sinon.stub(carModel.model, 'create').resolves(carMock));

    after((): void => Sinon.restore());

    it('return the created car', async (): Promise<void> => {
      const car = await carModel.create(carMock);

      expect(car).to.be.deep.equal(carMock);
    })
  })

  describe('#read', (): void => {
    before(() => Sinon.stub(carModel.model, 'find').resolves(carListMock as any));

    after((): void => Sinon.restore());

    it('return all the cars', async (): Promise<void> => {
      const car = await carModel.read();

      expect(car).to.be.deep.equal(carListMock);
    })
  })

  describe('#readOne', (): void => {
    before(() => Sinon.stub(carModel.model, 'findOne').resolves(carMock as any));

    after((): void => Sinon.restore());

    it('return a car by id', async (): Promise<void> => {
      const car = await carService.readOne('4edd40c86762e0fb12000003');

      expect(car).to.be.deep.equal(carMock);
    })
  })
})
