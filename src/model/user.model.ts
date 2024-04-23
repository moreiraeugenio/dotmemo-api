import { v4 as generateUuidv4 } from "uuid";
import { hashPassword } from "../util/password.util";

export default class User {
  private constructor(
    readonly id: string,
    readonly email: string,
    readonly password: string,
    readonly isPartial: boolean,
    readonly updatedAt: Date,
    readonly createdAt: Date,
  ) {}

  static withEmailAndPassword(email: string, password: string): User {
    const now = new Date();
    return new User(generateUuidv4(), email, password, true, now, now);
  }

  copyAsPermanent(): User {
    const now = new Date();
    return new User(this.id, this.email, this.password, false, now, this.createdAt);
  }

  async withHashedPassword(): Promise<User> {
    return new User(
      this.id,
      this.email,
      await hashPassword(this.password),
      this.isPartial,
      this.updatedAt,
      this.createdAt,
    );
  }
}
