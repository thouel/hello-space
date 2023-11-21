export class ApiError extends Error {
  public status: number
  constructor(statusCode: number = 500, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = statusCode
  }
}

export class NotAuthorizedError extends ApiError {
  constructor(statusCode: number = 403, message: string = 'Not authorized') {
    super(statusCode, message)
    this.name = 'NotAuthorizedError'
  }
}

export class UnexpectedError extends ApiError {
  constructor(
    statusCode: number = 500,
    message: string = 'Something wrong happened',
  ) {
    super(statusCode, message)
    this.name = 'UnexpectedError'
  }
}
