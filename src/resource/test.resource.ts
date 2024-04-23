import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default class TestResource {
  getTest(request: Request, response: Response): Response {
    return response.status(StatusCodes.OK).send("Test");
  }
}
