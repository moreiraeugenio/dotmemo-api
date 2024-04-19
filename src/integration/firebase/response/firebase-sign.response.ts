export class FirebaseSignResponse {
  idToken: string;
  refreshToken: string;
  expiresIn: string;

  constructor(idToken: string, refreshToken: string, expiresIn: string) {
    this.idToken = idToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }
}
