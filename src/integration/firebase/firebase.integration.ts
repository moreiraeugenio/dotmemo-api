import { injectable } from "tsyringe";
import { HttpHeader } from "../../common/http-header.common";
import { HttpMethod } from "../../common/http-method.common";
import { HttpStatus } from "../../common/http-status.common";
import { MediaType } from "../../common/media-type.common";
import EnvironmentConfiguration from "../../configuration/dotenv.configuration";
import { toJson } from "../../util/json.util";
import { FirebaseGetUserDataRequest } from "./request/firebase-get-user-data.request";
import FirebaseRefreshTokenRequest from "./request/firebase-refresh-token.request";
import FirebaseSignRequest from "./request/firebase-sign.request";
import { FirebaseUpdateProfileRequest } from "./request/firebase-update-profile.request";
import FirebaseGetUserDataResponse from "./response/firebase-get-user-data.response";
import FirebaseSignResponse from "./response/firebase-sign.response";

@injectable()
export default class FirebaseIntegration {
  private readonly apiKey: string;
  private readonly restApiBaseUrl: string;
  private readonly secureTokenBaseUrl: string;

  constructor(environmentConfiguration: EnvironmentConfiguration) {
    this.apiKey = environmentConfiguration.getStringValue("FIREBASE_API_KEY");
    this.restApiBaseUrl = environmentConfiguration.getStringValue("FIREBASE_REST_API_BASE_URL");
    this.secureTokenBaseUrl = environmentConfiguration.getStringValue(
      "FIREBASE_SECURE_TOKEN_BASE_URL",
    );
  }

  async signUp(email: string, textPlainPassword: string): Promise<FirebaseSignResponse | null> {
    try {
      const url = `${this.restApiBaseUrl}/accounts:signUp?key=${this.apiKey}`;
      const response = await fetch(url, {
        method: HttpMethod.POST,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
        },
        body: toJson(new FirebaseSignRequest(email, textPlainPassword)),
      });
      const responseData = (await response.json()) as FirebaseSignResponse;
      return responseData;
    } catch (error) {
      console.error("Error while signing up:", error);
      return null;
    }
  }

  async signIn(email: string, textPlainPassword: string): Promise<FirebaseSignResponse | null> {
    try {
      const url = `${this.restApiBaseUrl}/accounts:signInWithPassword?key=${this.apiKey}`;
      const response = await fetch(url, {
        method: HttpMethod.POST,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
        },
        body: toJson(new FirebaseSignRequest(email, textPlainPassword)),
      });
      const responseData = (await response.json()) as FirebaseSignResponse;
      return responseData;
    } catch (error) {
      console.error("Error while signing in:", error);
      return null;
    }
  }

  async refreshToken(refreshToken: string): Promise<FirebaseSignResponse | null> {
    try {
      const url = `${this.secureTokenBaseUrl}/token?key=${this.apiKey}`;
      const request = new FirebaseRefreshTokenRequest(refreshToken);
      const response = await fetch(url, {
        method: HttpMethod.POST,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
        },
        body: toJson(request),
      });
      const responseData = (await response.json()) as FirebaseSignResponse;
      return responseData;
    } catch (error) {
      console.error("Error while refreshing token:", error);
      return null;
    }
  }

  async getUserData(idToken: string): Promise<FirebaseGetUserDataResponse | null> {
    try {
      const url = `${this.restApiBaseUrl}/accounts:lookup?key=${this.apiKey}`;
      const request = new FirebaseGetUserDataRequest(idToken);
      const response = await fetch(url, {
        method: HttpMethod.POST,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
        },
        body: toJson(request),
      });
      const responseData = (await response.json()) as FirebaseGetUserDataResponse;
      return responseData;
    } catch (error) {
      console.error("Error while getting user data:", error);
      return null;
    }
  }

  async updateProfile(
    idToken: string,
    displayName: string | null = null,
    photoUrl: string | null = null,
  ): Promise<boolean> {
    try {
      const url = `${this.restApiBaseUrl}/accounts:update?key=${this.apiKey}`;
      const request = new FirebaseUpdateProfileRequest(idToken, displayName, photoUrl);
      const response = await fetch(url, {
        method: HttpMethod.POST,
        headers: {
          [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
        },
        body: toJson(request),
      });
      return response.status === HttpStatus.OK;
    } catch (error) {
      console.error("Error while updating profile:", error);
      return false;
    }
  }
}