import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { HttpStatus } from "../common/http-status.common";
import UserModel from "../model/user.model";
import UserAlreadyExistsError from "../service/error/user-already-exists.error";
import UserService from "../service/user.service";
import ErrorResponse from "./response/error.response";
import LoginResponse from "./response/login.response";

@injectable()
export default class UserResource {
  constructor(private readonly userService: UserService) {}

  register = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        const errorResponse = ErrorResponse.ofEmailAndPasswordAreRequired(request.path);
        return response.status(errorResponse.status).json(errorResponse);
      }
      await this.userService.register(UserModel.withEmailAndPassword(email, password));
      return response.status(HttpStatus.CREATED).send();
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        const errorResponse = ErrorResponse.ofEmailAlreadyRegistered(request.path);
        return response.status(errorResponse.status).json(errorResponse);
      }
      const errorResponse = ErrorResponse.fromError(error, request.path);
      return response.status(errorResponse.status).json(errorResponse);
    }
  };

  login = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        const errorResponse = ErrorResponse.ofEmailAndPasswordAreRequired(request.path);
        return response.status(errorResponse.status).json(errorResponse);
      }
      const idToken = await this.userService.login(email, password);
      return response.status(HttpStatus.OK).json(new LoginResponse(idToken));
    } catch (error) {
      const errorResponse = ErrorResponse.fromError(error, request.path);
      return response.status(errorResponse.status).json(errorResponse);
    }
  };
}
