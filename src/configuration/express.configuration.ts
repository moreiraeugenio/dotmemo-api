import cors from "cors";
import express from "express";
import helmet from "helmet";
import { singleton } from "tsyringe";

@singleton()
export default class ExpressConfiguration {
  readonly expressApplication: express.Application;

  constructor() {
    this.expressApplication = this.configure();
  }

  private configure(): express.Application {
    const expressApplication = express();
    expressApplication.use(express.json());
    expressApplication.use(express.urlencoded({ extended: true }));
    expressApplication.use(cors());
    expressApplication.use(helmet());
    return expressApplication;
  }
}
