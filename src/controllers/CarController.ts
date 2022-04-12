import { Response } from 'express';
import {
  MongoController,
  RequestWithBody,
  ResponseError,
} from './MongoController';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';

export default class CarController extends MongoController<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  public create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    try {
      const result = await this.service.create(body);

      if (!result) {
        return res.status(500).json({ error: this.errors.internal });
      }
  
      if ('error' in result) {
        return res.status(400).json(result);
      }

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}