export class LiveEnvironmentRequiredError extends Error {
  constructor(operation: string) {
    super(`${operation} requires live environment wiring`);
    this.name = 'LiveEnvironmentRequiredError';
  }
}

export class MigrationDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MigrationDataError';
  }
}
