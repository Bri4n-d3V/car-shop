import { Car/* , CarSchema */ } from '../interfaces/CarInterface';
import { MongoService/* , ServiceError */ } from './MongoService';
import CarModel from '../models/CarModel';

export default class CarService extends MongoService<Car> {
  constructor(public model = new CarModel()) {
    super(model);
  }
}