import ResourceError from "./resource.error";

export default class EmailNotFoundError extends Error implements ResourceError {
  constructor(idToken: string) {
    super(`Email not found from user with ID token '${idToken}'`);
  }
}
