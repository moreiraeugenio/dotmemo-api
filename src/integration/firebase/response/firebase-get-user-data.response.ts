export class FirebaseGetUserDataResponse {
  users: FirebaseUserDataResponse[];

  constructor(users: FirebaseUserDataResponse[]) {
    this.users = users;
  }
}

export class FirebaseUserDataResponse {
  email: string;
  emailVerified: boolean;
  displayName: string;

  constructor(email: string, emailVerified: boolean, displayName: string) {
    this.email = email;
    this.emailVerified = emailVerified;
    this.displayName = displayName;
  }
}
