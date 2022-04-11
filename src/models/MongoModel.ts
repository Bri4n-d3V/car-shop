import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) { }

  public async create(obj: T): Promise<T> {
    const result = await this.model.create({ ...obj });
    return result;
  }

  public async read(): Promise<T[]> {
    const result = await this.model.find();
    return result;
  }

  public async readOne(id: string): Promise<T | null> {
    const result = await this.model.findById(id);
    return result;
  }

  public async update(id: string, obj: T): Promise<T | null> {
    const result = await this.model.findByIdAndUpdate(id, obj);
    return result;
  }

  public async delete(id: string): Promise<T | null> {
    const result = await this.model.findByIdAndDelete(id);
    return result;
  }
}

export default MongoModel;