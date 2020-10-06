import { ErrorMessage, ErrorStack } from '../types';

abstract class BaseErrorParser {
  parseError(error: Error): ErrorMessage {
    return {
      message: error.message,
      stack: this.parseStack(
        (error.stack || '')
          .split('\n')
          .map((i) => i.trim())
          .filter((i) => !!i)
      ),
    };
  }

  abstract parseStack(stackLines: string[]): ErrorStack;
}

export default BaseErrorParser;
