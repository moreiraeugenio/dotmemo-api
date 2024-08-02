import dotenv from "dotenv";
import { singleton } from "tsyringe";

@singleton()
export default class EnvironmentConfiguration {
  constructor() {
    dotenv.config();
  }

  getStringValue(key: string): string {
    return process.env[key] as string;
  }

  getIntValue(key: string): number {
    return parseInt(this.getStringValue(key));
  }
}
