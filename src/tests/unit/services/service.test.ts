import { expect } from 'chai';
import Sinon from 'sinon';
import CarService from '../../../services/CarService';
import { carMock, carListMock, badCarMock } from '../mocks/CarMock';

describe('CarService', (): void => {
  let carService = new CarService();

  describe('#create', (): void => {
    before(() => Sinon.stub(carService.model, 'create').resolves(carMock));

    after((): void => Sinon.restore());

    it('return the created car', async (): Promise<void> => {
      const car = await carService.create(carMock);

      expect(car).to.be.deep.equal(carMock);
    })

    it('return the error message when bad request', async (): Promise<void> => {
      const car = await carService.create(badCarMock as any);

      expect(car).to.not.be.equal(carMock);
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
      const car = await carService.readOne(carMock._id);

      expect(car).to.be.deep.equal(carMock);
    })
  })

  describe('#update', (): void => {
    before(() => Sinon.stub(carService.model, 'update').resolves(carMock as any));

    after((): void => Sinon.restore());

    it('return the car with the updated values', async (): Promise<void> => {
      const car = await carService.update(carMock._id, carMock);

      expect(car).to.be.deep.equal(carMock);
    })
  })
})
