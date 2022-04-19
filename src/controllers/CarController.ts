import { Request, Response } from 'express';
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
        const err = result.error.issues[0].message;

        return res.status(400).json({ error: err });
      }

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const result = await this.service.read();
      
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(400).json({
        error: this.errors.idLength,
      });
    }
    const result = await this.service.readOne(id);
    if (!result) {
      return res.status(404).json({ error: this.errors.notFound });
    }
    if ('error' in result) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  };

  public update = async (
    req: Request<{ id: string, obj: Car }>,
    res: Response<Car | ResponseError | null>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;

    if (id.length !== 24) {
      return res.status(400).json({
        error: this.errors.idLength,
      });
    }

    const result = await this.service.update(id, body);

    if (!result) {
      return res.status(404).json({ error: this.errors.notFound });
    }

    if ('error' in result) return res.status(400).json(result);

    return res.status(200).json(result);
  };
}