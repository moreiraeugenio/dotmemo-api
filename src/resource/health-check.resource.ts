import { Request, Response } from "express";
import { HttpStatus } from "../common/http-status.common";

export default class HealthCheckResource {
  getStatus = (request: Request, response: Response): Response => {
    return response.status(HttpStatus.OK).send("OK");
  };
}
