import { MongoController } from './MongoController';
import CarService from '../services/CarService';
import { Car, CarSchema } from '../interfaces/CarInterface';

export default class CarController extends MongoController<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service, CarSchema);
    this._route = route;
  }

  get route() { return this._route; }
}