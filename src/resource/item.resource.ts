import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { HttpStatus } from "../common/http-status.common";
import FirebaseIntegration from "../integration/firebase/firebase.integration";
import ItemService from "../service/item.service";
import EmailNotFoundError from "./error/email-not-found.error";
import ErrorResponse from "./response/error.response";
import ItemsResponse from "./response/items.response";

@injectable()
export default class ItemResource {
  constructor(
    private readonly itemService: ItemService,
    private readonly firebaseIntegration: FirebaseIntegration,
  ) {}

  findAll = async (request: Request, response: Response): Promise<Response> => {
    try {
      const authorizationHeaderValue = request.headers.authorization;
      if (!authorizationHeaderValue) {
        return this.returnAuthorizationIsRequiredErrorResponse(response, request.path);
      }
      const idToken = this.extractIdTokenFromAuthorizationHeaderValue(authorizationHeaderValue);
      if (!idToken) {
        return this.returnAuthorizationIsRequiredErrorResponse(response, request.path);
      }
      const userEmail = await this.firebaseIntegration
        .getUserData(idToken)
        .then((response) => response.users.at(0)?.email);
      if (!userEmail) {
        throw new EmailNotFoundError(idToken);
      }
      const items = await this.itemService.findAllByUserEmail(userEmail);
      return response.status(HttpStatus.OK).json(new ItemsResponse(items));
    } catch (error) {
      const errorResponse = ErrorResponse.fromError(error, request.path);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  };

  private extractIdTokenFromAuthorizationHeaderValue(authorizationHeaderValue: string): string {
    return authorizationHeaderValue.split(" ")[1];
  }

  private returnAuthorizationIsRequiredErrorResponse(response: Response, requestPath: string): Response {
    const errorResponse = ErrorResponse.ofAuthorizationIsRequired(requestPath);
    return response.status(errorResponse.status).json(errorResponse);
  }

  create = async (request: Request, response: Response): Promise<Response> => {
    try {
      const authorizationHeaderValue = request.headers.authorization;
      if (!authorizationHeaderValue) {
        return this.returnAuthorizationIsRequiredErrorResponse(response, request.path);
      }
      const idToken = this.extractIdTokenFromAuthorizationHeaderValue(authorizationHeaderValue);
      if (!idToken) {
        this.returnAuthorizationIsRequiredErrorResponse(response, request.path);
      }
      const { key, value } = request.body;
      if (!key || !value) {
        const errorResponse = ErrorResponse.ofKeyAndValueAreRequired(request.path);
        return response.status(errorResponse.status).json(errorResponse);
      }
      const userEmail = await this.firebaseIntegration
        .getUserData(idToken)
        .then((response) => response.users.at(0)?.email);
      if (!userEmail) {
        throw new EmailNotFoundError(idToken);
      }
      const items = await this.itemService.createForUserEmail(key, value, userEmail);
      return response.status(HttpStatus.CREATED).json(new ItemsResponse(items));
    } catch (error) {
      const errorResponse = ErrorResponse.fromError(error, request.path);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  };
}
