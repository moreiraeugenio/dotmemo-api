export default class FirebaseGetUserDataResponse {
  constructor(readonly users: FirebaseUserDataResponse[]) {}
}

export class FirebaseUserDataResponse {
  constructor(
    readonly email: string,
    readonly emailVerified: boolean,
    readonly displayName: string,
  ) {}
}
