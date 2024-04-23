export default class FirebaseSignRequest {
  private readonly email;
  private readonly password;
  private readonly returnSecureToken: boolean = true;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
