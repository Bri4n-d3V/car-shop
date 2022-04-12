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
})
