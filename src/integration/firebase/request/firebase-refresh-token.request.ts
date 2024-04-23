export default class FirebaseRefreshTokenRequest {
  private readonly grant_type: string = "refresh_token";
  private readonly refresh_token: string;

  constructor(refreshToken: string) {
    this.refresh_token = refreshToken;
  }
}
