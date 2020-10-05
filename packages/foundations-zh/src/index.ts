export interface ErrorMessage {
  message: string;
  stack: Array<{
    line: number;
    column: number;
    filename: string;
  }>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function parseError(err: Error): ErrorMessage {
  // TODO: implement
}
