export default class FirebaseSignRequest {
  private readonly email;
  private readonly password;
  private readonly returnSecureToken: boolean = true;

  constructor(email: string, textPlainPassword: string) {
    this.email = email;
    this.password = textPlainPassword;
  }
}
