import { HttpStatus } from "../../common/http-status.common";

export default class ErrorResponse {
  readonly timestamp: string = new Date().toISOString();
  readonly status: number;
  readonly error: string;
  readonly message: string;
  readonly path: string;

  constructor(status: number, message: string, path: string) {
    this.status = status;
    this.error = HttpStatus[status];
    this.message = message;
    this.path = path;
  }

  static fromError(error: any, path: string) {
    return new ErrorResponse(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred. Please try again later",
      path,
    );
  }

  static ofEmailAndPasswordAreRequired(path: string) {
    return new ErrorResponse(HttpStatus.BAD_REQUEST, "Fields 'email' and 'password' are required", path);
  }

  static ofEmailAlreadyRegistered(path: string) {
    return new ErrorResponse(HttpStatus.BAD_REQUEST, "This email has already been registered", path);
  }

  static ofKeyAndValueAreRequired(path: string) {
    return new ErrorResponse(HttpStatus.BAD_REQUEST, "Fields 'key' and 'value' are required", path);
  }

  static ofAuthorizationIsRequired(path: string) {
    return new ErrorResponse(HttpStatus.UNAUTHORIZED, "You are not authorized", path);
  }
}
