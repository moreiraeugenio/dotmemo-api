export class FirebaseSignRequest {
  private _email: string;
  private _password: string;
  private _returnSecureToken: boolean = true;

  constructor(email: string, password: string) {
    this._email = email;
    this._password = password;
  }
}
