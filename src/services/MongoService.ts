import { ZodError } from 'zod';
import MongoModel from '../models/MongoModel';

export interface ServiceError {
  error: ZodError;
}

export class MongoService<T> {
  constructor(public model: MongoModel<T>) {}

  public async create(obj: T): Promise<T | ServiceError | null> {
    const result = await this.model.create(obj);
    return result;
  }

  public async read(): Promise<T[] | ServiceError | null> {
    const result = await this.model.read();
    return result;
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    const result = await this.model.readOne(id);
    return result;
  }

  public async update(id: string, obj: T): Promise<T | null | ServiceError> {
    const result = await this.model.update(id, obj);
    return result;
  }

  public async delete(id: string): Promise<T | null | ServiceError> {
    const result = await this.model.delete(id);
    return result;
  }
}