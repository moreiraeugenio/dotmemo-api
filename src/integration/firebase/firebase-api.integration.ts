import dotenv from "dotenv";
import { HttpHeader } from "../../common/http-header.common";
import { HttpMethod } from "../../common/http-method.common";
import { HttpStatus } from "../../common/http-status.common";
import { MediaType } from "../../common/media-type.common";
import { toJson } from "../../util/json.util";
import { FirebaseGetUserDataRequest } from "./request/firebase-get-user-data.request";
import { FirebaseRefreshTokenRequest } from "./request/firebase-refresh-token.request";
import { FirebaseSignRequest } from "./request/firebase-sign.request";
import { FirebaseUpdateProfileRequest } from "./request/firebase-update-profile.request";
import { FirebaseGetUserDataResponse } from "./response/firebase-get-user-data.response";
import { FirebaseSignResponse } from "./response/firebase-sign.response";

dotenv.config();
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
const FIREBASE_REST_API_BASE_URL = "https://identitytoolkit.googleapis.com/v1";
const FIREBASE_SECURE_TOKEN_BASE_URL = "https://securetoken.googleapis.com/v1";

export const signUp = async (
  email: string,
  password: string,
): Promise<FirebaseSignResponse | null> => {
  try {
    const url = `${FIREBASE_REST_API_BASE_URL}/accounts:signUp?key=${FIREBASE_API_KEY}`;
    const response = await fetch(url, {
      method: HttpMethod.POST,
      headers: {
        [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
      },
      body: toJson(new FirebaseSignRequest(email, password)),
    });
    const responseData = (await response.json()) as FirebaseSignResponse;
    return responseData;
  } catch (error) {
    console.error("Error while signing up:", error);
    return null;
  }
};

export const signIn = async (
  email: string,
  password: string,
): Promise<FirebaseSignResponse | null> => {
  try {
    const url = `${FIREBASE_REST_API_BASE_URL}/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const response = await fetch(url, {
      method: HttpMethod.POST,
      headers: {
        [HttpHeader.CONTENT_TYPE]: MediaType.APPLICATION_JSON,
      },
      body: toJson(new FirebaseSignRequest(email, password)),
    });
    const responseData = (await response.json()) as FirebaseSignResponse;
    return responseData;
  } catch (error) {
    console.error("Error while signing in:", error);
    return null;
  }
};

export const refreshToken = async (refreshToken: string): Promise<FirebaseSignResponse | null> => {
  try {
    const url = `${FIREBASE_SECURE_TOKEN_BASE_URL}/token?key=${FIREBASE_API_KEY}`;
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
};

export const getUserData = async (idToken: string): Promise<FirebaseGetUserDataResponse | null> => {
  try {
    const url = `${FIREBASE_REST_API_BASE_URL}/accounts:lookup?key=${FIREBASE_API_KEY}`;
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
};

export const updateProfile = async (
  idToken: string,
  displayName: string | null = null,
  photoUrl: string | null = null,
): Promise<boolean> => {
  try {
    const url = `${FIREBASE_REST_API_BASE_URL}/accounts:update?key=${FIREBASE_API_KEY}`;
    const request = new FirebaseUpdateProfileRequest(idToken, displayName, photoUrl);
    console.log(request);
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
};
