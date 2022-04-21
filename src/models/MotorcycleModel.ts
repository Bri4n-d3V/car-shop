import { Schema, model as createModel } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

const motorcycleSchema = new Schema<Motorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean || undefined,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class MotorcycleModel extends MongoModel<Motorcycle> {
  constructor(public model = createModel('Motorcycle', motorcycleSchema)) {
    super(model);
  }
}