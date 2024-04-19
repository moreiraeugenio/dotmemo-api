export interface HttpRequest {}

/**
 * Converts an object to JSON, taking into account the `_` prefix of private properties.
 *
 * @param {HttpRequest} object - The object to convert to JSON.
 * @return {string} The JSON representation of the object.
 */
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
