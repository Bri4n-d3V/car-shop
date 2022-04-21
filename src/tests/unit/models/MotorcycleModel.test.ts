import { expect } from 'chai';
import Sinon from 'sinon';
import { Motorcycle } from '../../../interfaces/MotorcycleInterface';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { motorcycleListMock, motorcycleMock } from '../mocks/MotorcycleMock';

describe('MotorcycleModel', (): void => {
  let motorcycleModel = new MotorcycleModel();

  describe('#create', (): void => {
    before(() => Sinon.stub(motorcycleModel.model, 'create').resolves(motorcycleMock));

    after((): void => Sinon.restore());

    it('return the created motorcycle', async (): Promise<void> => {
      const motorcycle = await motorcycleModel.create(motorcycleMock as Motorcycle);
      
      expect(motorcycle).to.be.deep.equal(motorcycleMock);
    })
  })

  describe('#read', (): void => {
    before(() => Sinon.stub(motorcycleModel.model, 'find').resolves(motorcycleListMock as any));

    after((): void => Sinon.restore());

    it('return all the motorcycles', async (): Promise<void> => {
      const motorcycle = await motorcycleModel.read();

      expect(motorcycle).to.be.deep.equal(motorcycleListMock);
    })
  })

  describe('#readOne', (): void => {
    before(() => Sinon.stub(motorcycleModel.model, 'findOne').resolves(motorcycleMock as any));

    after((): void => Sinon.restore());

    it('return a motorcycle by id', async (): Promise<void> => {
      const motorcycle = await motorcycleModel.readOne(motorcycleMock._id as string);

      expect(motorcycle).to.be.deep.equal(motorcycleMock);
    })
  })

  describe('#update', (): void => {
    before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndUpdate').resolves(motorcycleMock as any));

    after((): void => Sinon.restore());

    it('return the motorcycle with the updated values', async (): Promise<void> => {
      const motorcycle = await motorcycleModel.update(motorcycleMock._id, motorcycleMock as Motorcycle);

      expect(motorcycle).to.be.deep.equal(motorcycleMock);
    })
  })

  describe('#delete', (): void => {
    before(() => Sinon.stub(motorcycleModel.model, 'findByIdAndDelete').resolves(motorcycleMock as any));

    after((): void => Sinon.restore());

    it('the motorcycle is deleted', async (): Promise<void> => {
      const motorcycle = await motorcycleModel.delete(motorcycleMock._id as string);

      expect(motorcycle).to.be.deep.equal(motorcycleMock);
    })
  })
})
