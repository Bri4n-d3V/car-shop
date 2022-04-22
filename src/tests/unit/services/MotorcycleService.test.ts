import { expect } from 'chai';
import Sinon from 'sinon';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import MotorcycleService from '../../../services/MotorcycleService';
import { badMotorcycleMock, motorcycleListMock, motorcycleMock } from '../mocks/MotorcycleMock';

describe('MotorcycleService', (): void => {
  const motorcycleService = new MotorcycleService();

  describe('#create', (): void => {
    before(() =>
      Sinon.stub(motorcycleService.model, 'create').
        onCall(0).resolves(motorcycleMock as Motorcycle)
        .onCall(1).resolves());

    after((): void => Sinon.restore());

    it('return the created car', async (): Promise<void> => {
      const car = await motorcycleService.create(motorcycleMock as Motorcycle);

      expect(car).to.be.deep.equal(motorcycleMock);
    })

    it('return the error message when bad request', async (): Promise<void> => {
      const car = await motorcycleService.create(badMotorcycleMock as any);

      expect(car).to.not.be.deep.equal(motorcycleMock);
    })
  })

  describe('#read', (): void => {
    before(() => Sinon.stub(motorcycleService.model, 'read').resolves(motorcycleListMock as any));

    after((): void => Sinon.restore());

    it('return all the cars', async (): Promise<void> => {
      const car = await motorcycleService.read();

      expect(car).to.be.deep.equal(motorcycleListMock);
    })
  })

  describe('#readOne', (): void => {
    before(() => Sinon.stub(motorcycleService.model, 'readOne').resolves(motorcycleMock as any));

    after((): void => Sinon.restore());

    it('return a car by id', async (): Promise<void> => {
      const car = await motorcycleService.readOne(motorcycleMock._id);

      expect(car).to.be.deep.equal(motorcycleMock);
    })
  })

  describe('#update', (): void => {
    before(() => Sinon.stub(motorcycleService.model, 'update').resolves(motorcycleMock as any));

    after((): void => Sinon.restore());

    it('return the car with the updated values', async (): Promise<void> => {
      const car = await motorcycleService.update(motorcycleMock._id, motorcycleMock as Motorcycle);

      expect(car).to.be.deep.equal(motorcycleMock);
    })
  })

  describe('#delete', (): void => {
    before(() => Sinon.stub(motorcycleService.model, 'delete').resolves(motorcycleMock as any));

    after((): void => Sinon.restore());

    it('the car is deleted', async (): Promise<void> => {
      const car = await motorcycleService.delete(motorcycleMock._id);

      expect(car).to.be.deep.equal(motorcycleMock);
    })
  })
})
