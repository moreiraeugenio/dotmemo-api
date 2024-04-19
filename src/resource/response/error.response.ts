import { StatusCodes } from "http-status-codes";

export class ErrorResponse {
  timestamp: string = new Date().toISOString();
  status: number;
  error: string;
  message: string;
  path: string;

  constructor(status: number, message: string, path: string) {
    this.status = status;
    this.error = StatusCodes[status];
    this.message = message;
    this.path = path;
  }

  static fromError(error: any, path: string) {
    return new ErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred. Please try again later",
      path,
    );
  }

  static ofEmailAndPasswordAreRequired(path: string) {
    return new ErrorResponse(
      StatusCodes.BAD_REQUEST,
      "Fields 'email' and 'password' are required",
      path,
    );
  }

  static ofEmailAlreadyRegistered(path: string) {
    return new ErrorResponse(
      StatusCodes.BAD_REQUEST,
      "This email has already been registered",
      path,
    );
  }
}
