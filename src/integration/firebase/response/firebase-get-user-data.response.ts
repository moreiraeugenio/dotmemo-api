export default class FirebaseGetUserDataResponse {
  constructor(private readonly users: FirebaseUserDataResponse[]) {}
}

export class FirebaseUserDataResponse {
  constructor(
    private readonly email: string,
    private readonly emailVerified: boolean,
    private readonly displayName: string,
  ) {}
}
