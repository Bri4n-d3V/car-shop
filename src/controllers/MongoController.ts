import { Request, Response } from 'express';
import { Car } from '../interfaces/CarInterface';
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
  idLength = 'Id must have 24 hexadecimal characters',
}

export abstract class MongoController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: MongoService<T>) { }

  public abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public abstract read(
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res>;

  public abstract readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public abstract update(
    req: Request<{ id: string, obj: Car }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public abstract delete(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}