import { Router } from 'express';
import { MongoController } from '../controllers/MongoController';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: MongoController<T>,
    route: string = controller.route,
  ): void {
    this.router.post(route, controller.create);
  }
}

export default CustomRouter;