export interface HttpRequest {}

export const toJson = (object: HttpRequest): string => {
  return JSON.stringify(
    Object.fromEntries(
      Object.entries(object).map(([key, value]) => [
        key.startsWith("_") ? key.substring(1) : key,
        value,
      ]),
    ),
  );
};
