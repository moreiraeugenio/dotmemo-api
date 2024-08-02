import { v4 as generateUuidv4 } from "uuid";

export default class ItemModel {
  private constructor(
    readonly id: string,
    readonly key: string,
    readonly value: string,
    readonly userEmail: string,
    readonly updatedAt: Date,
    readonly createdAt: Date,
  ) {}

  static withKeyAndValue(key: string, value: string, userEmail: string): ItemModel {
    const now = new Date();
    return new ItemModel(generateUuidv4(), key, value, userEmail, now, now);
  }
}
