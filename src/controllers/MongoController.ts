import { Request, Response } from 'express';
import { MongoService } from '../services/MongoService';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

export abstract class MongoController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: MongoService<T>) { }

  public abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res | void>;

  public read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const result = await this.service.read();
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  public abstract readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError | null>,
  ): Promise<typeof res>;
}