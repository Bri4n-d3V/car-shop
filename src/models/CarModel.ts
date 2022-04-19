import { Schema, model as createModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

const carSchema = new Schema<Car>({
  model: String,
  year: Number,
  color: String,
  status: Boolean || undefined,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class CarModel extends MongoModel<Car> {
  constructor(public model = createModel('Car', carSchema)) {
    super(model);
  }
}