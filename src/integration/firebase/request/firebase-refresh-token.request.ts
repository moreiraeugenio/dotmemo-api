export class FirebaseRefreshTokenRequest {
  private _grant_type: string = "refresh_token";
  private _refresh_token: string;

  constructor(refreshToken: string) {
    this._refresh_token = refreshToken;
  }
}
