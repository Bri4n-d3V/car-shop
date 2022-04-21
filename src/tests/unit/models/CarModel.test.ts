import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { carMock, carListMock } from '../mocks/CarMock';

describe('CarModel', (): void => {
  let carModel = new CarModel();

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
      const car = await carModel.readOne(carMock._id as string);

      expect(car).to.be.deep.equal(carMock);
    })
  })

  describe('#update', (): void => {
    before(() => Sinon.stub(carModel.model, 'findByIdAndUpdate').resolves(carMock as any));

    after((): void => Sinon.restore());

    it('return the car with the updated values', async (): Promise<void> => {
      const car = await carModel.update(carMock._id, carMock);

      expect(car).to.be.deep.equal(carMock);
    })
  })

  describe('#delete', (): void => {
    before(() => Sinon.stub(carModel.model, 'findByIdAndDelete').resolves(carMock as any));

    after((): void => Sinon.restore());

    it('the car is deleted', async (): Promise<void> => {
      const car = await carModel.delete(carMock._id as string);

      expect(car).to.be.deep.equal(carMock);
    })
  })
})
