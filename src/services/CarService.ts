import { Car/* , CarSchema */ } from '../interfaces/CarInterface';
import { MongoService/* , ServiceError */ } from './MongoService';
import CarModel from '../models/CarModel';

export default class CarService extends MongoService<Car> {
  constructor(public model = new CarModel()) {
    super(model);
  }

  /* public async create(obj: Car): Promise<Car | ServiceError | null> {
    const result = CarSchema.safeParse(obj);

    if (!result.success) {
      return { error: result.error };
    }

    return this.model.create(obj);
  }

  public async read(): Promise<Car[]> {
    const result = await this.model.read();
    return result;
  }

  public async readOne(id: string): Promise<Car | ServiceError | null> {
    return this.model.readOne(id);
  }

  public async update(id: string, obj: Car)
    : Promise<Car | ServiceError | null> {
    return this.model.update(id, obj);
  } */
}