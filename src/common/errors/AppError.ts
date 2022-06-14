class AppError {
  public readonly message: string | unknown;

  public readonly statusCode: number;

  public readonly body: object | null;

  constructor(message: string | unknown, statusCode = 502, body: object | null = null) {
    this.message = message;
    this.statusCode = statusCode;
    this.body = body;
  }
}

export default AppError;
