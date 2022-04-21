import { MongoController } from './MongoController';
import MotorcycleService from '../services/MotorcycleService';
import { 
  Motorcycle,
  MotorcycleSchema } from '../interfaces/MotorcycleInterface';

export default class MotorcycleController extends MongoController<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service, MotorcycleSchema);
    this._route = route;
  }

  get route() { return this._route; }
}