import { Request, Response } from 'express';
import { ZodSchema, ZodError } from 'zod';
import MongoService from '../services/MongoService';

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

export interface ServiceError {
  error: ZodError;
} 

export abstract class MongoController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(
    protected service: MongoService<T>,
    protected schema: ZodSchema<T>,
  ) {}

  private parseChecker(body: T) {
    const parse = this.schema.safeParse(body);
  
    if (!parse.success) {
      return { error: parse.error };
    }
  }

  public create = async (
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    const parse = this.parseChecker(body);

    if (parse) {
      const err = parse.error.issues[0].message;

      return res.status(400).json({ error: err });
    }

    const result = await this.service.create(body);

    if (!result) {
      return res.status(500).json({ error: this.errors.internal });
    }

    return res.status(201).json(result);
  };

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

  public readOne = async (
    req: Request<{ id: string }>,
    res: Response<T | ResponseError | null>,
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
    req: Request<{ id: string, obj: T }>,
    res: Response<T | ResponseError | null>,
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

  public delete = async (
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    if (id.length !== 24) {
      return res.status(400).json({
        error: this.errors.idLength,
      });
    }
    
    const result = await this.service.delete(id);

    if (!result) {
      return res.status(404).json({ error: this.errors.notFound });
    }

    return res.status(204).send();
  };
}