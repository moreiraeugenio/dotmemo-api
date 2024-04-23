export default class FirebaseSignResponse {
  readonly idToken: string;
  readonly refreshToken: string;
  readonly expiresIn: string;

  constructor(idToken: string, refreshToken: string, expiresIn: string) {
    this.idToken = idToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }
}
