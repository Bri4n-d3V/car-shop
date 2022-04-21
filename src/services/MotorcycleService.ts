import MongoService from './MongoService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/MotorcycleModel';

export default class MotorcycleService extends MongoService<Motorcycle> {
  constructor(public model = new MotorcycleModel()) {
    super(model);
  }
}