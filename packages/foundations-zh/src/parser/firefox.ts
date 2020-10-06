import R from 'ramda';
import { ErrorStack } from '../types';
import BaseErrorParser from './base';

export default class FirefoxErrorParser extends BaseErrorParser {
  parseStack(stackLines: string[]): ErrorStack {
    return R.pipe<string[], ErrorStack, ErrorStack>(
      R.map((line) => {
        const [, , filenameMatch, columnMatch, lineMatch] = R.match(/(\w+@)?(.*):(\d+):(\d+)$/, line);
        return {
          filename: filenameMatch,
          column: Number(columnMatch),
          line: Number(lineMatch),
        };
      }),
      R.reject(R.propEq('filename', '<anonymous>'))
    )(stackLines);
  }
}
