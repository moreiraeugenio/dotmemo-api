export default class HttpError {
  private constructor(
    private readonly status: number,
    private readonly statusText: string,
    private readonly body: string,
  ) {}

  static async fromResponse(response: Response): Promise<HttpError> {
    return new HttpError(response.status, response.statusText, await response.json());
  }
}
