import { expect } from 'chai';
import Sinon from 'sinon';
import CarService from '../../../services/CarService';
import { carMock, carListMock } from '../mocks/CarMock';

describe('CarService', (): void => {
  let carService = new CarService();

  describe('#create', (): void => {
    before(() => Sinon.stub(carService.model, 'create').resolves(carMock));

    after((): void => Sinon.restore());

    it('return the created car', async (): Promise<void> => {
      const car = await carService.create(carMock);

      expect(car).to.be.deep.equal(carMock);
    })
  })

  describe('#read', (): void => {
    before(() => Sinon.stub(carService.model, 'read').resolves(carListMock as any));

    after((): void => Sinon.restore());

    it('return all the cars', async (): Promise<void> => {
      const car = await carService.read();

      expect(car).to.be.deep.equal(carListMock);
    })
  })

  describe('#readOne', (): void => {
    before(() => Sinon.stub(carService.model, 'readOne').resolves(carMock as any));

    after((): void => Sinon.restore());

    it('return a car by id', async (): Promise<void> => {
      const car = await carService.readOne('4edd40c86762e0fb12000003');

      expect(car).to.be.deep.equal(carMock);
    })
  })
})