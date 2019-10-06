import 'dotenv/config'
import mongoose from 'mongoose'
import express, { Application } from 'express'
import Controller from './interfaces/controller';
import TodoController from './controllers/todoController';

class App {
  private app: Application;

  constructor() {
    this.app = express();

    this.connectToMongoDb();
    this.initializeControllers();

    this.serveFrontend();
  }

  public listen(port: string) {
    this.app.listen(port, () => console.log(`App listening on port ${port}`));
  }

  private connectToMongoDb() {
    const MONGO_USER = process.env.MONGO_USER;
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
    const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME;
    const dbUri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@maincluster-e6wjc.mongodb.net/${MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;

    mongoose.connect(
      dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  private initializeControllers() {
    [
      new TodoController()
    ].forEach(controller => {
      this.app.use('/api/', controller.router);
    });
  }

  private serveFrontend() {
    this.app.use(express.static('dist/public/frontend'));
  }
}

let PORT = process.env.PORT;
if (PORT == null || PORT == '') {
  PORT = '8081';
}

const app = new App();
app.listen(PORT);