export type ErrorStack = {
  line: number;
  column: number;
  filename: string;
}[];

export interface ErrorMessage {
  message: string;
  stack: ErrorStack;
}
