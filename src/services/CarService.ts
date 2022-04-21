import { Car } from '../interfaces/CarInterface';
import MongoService from './MongoService';
import CarModel from '../models/CarModel';

export default class CarService extends MongoService<Car> {
  constructor(public model = new CarModel()) {
    super(model);
  }
}