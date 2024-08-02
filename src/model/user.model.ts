import { v4 as generateUuidv4 } from "uuid";
import { hashPassword } from "../util/password.util";

export default class UserModel {
  private constructor(
    readonly id: string,
    readonly email: string,
    readonly password: string,
    readonly isPartial: boolean,
    readonly updatedAt: Date,
    readonly createdAt: Date,
  ) {}

  static withEmailAndPassword(email: string, password: string): UserModel {
    const now = new Date();
    return new UserModel(generateUuidv4(), email, password, true, now, now);
  }

  copyAsPermanent(): UserModel {
    const now = new Date();
    return new UserModel(this.id, this.email, this.password, false, now, this.createdAt);
  }

  async withHashedPassword(): Promise<UserModel> {
    return new UserModel(
      this.id,
      this.email,
      await hashPassword(this.password),
      this.isPartial,
      this.updatedAt,
      this.createdAt,
    );
  }
}
