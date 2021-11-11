class HttpError extends Error {
  constructor(message, error_code) {
    super(message);

    this.status = error_code;
  }
}

module.exports = HttpError;
