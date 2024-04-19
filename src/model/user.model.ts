import { v4 as generateUuidv4 } from "uuid";

export class User {
  id: string;
  email: string;
  password: string;

  private constructor(id: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  static withEmailAndPassword(email: string, password: string) {
    return new User(generateUuidv4(), email, password);
  }

  static withHashedPassword(user: User, hashedPassword: string) {
    return new User(user.id, user.email, hashedPassword);
  }
}
