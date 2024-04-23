import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { HttpStatus } from "../common/http-status.common";
import User from "../model/user.model";
import UserAlreadyExistsError from "../service/error/user-already-exists.error";
import UserService from "../service/user.service";
import ErrorResponse from "./response/error.response";

@injectable()
export default class UserResource {
  constructor(private readonly userService: UserService) {}

  async register(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        const errorResponse = ErrorResponse.ofEmailAndPasswordAreRequired(request.path);
        return response.status(errorResponse.status).json(errorResponse);
      }
      await this.userService.register(await User.withEmailAndPassword(email, password));
      return response.status(HttpStatus.CREATED).send();
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        const errorResponse = ErrorResponse.ofEmailAlreadyRegistered(request.path);
        return response.status(errorResponse.status).json(errorResponse);
      }
      const errorResponse = ErrorResponse.fromError(error, request.path);
      return response.status(errorResponse.status).json(errorResponse);
    }
  }
}
