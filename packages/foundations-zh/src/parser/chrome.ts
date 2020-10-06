import R from 'ramda';
import { ErrorStack } from '../types';
import BaseErrorParser from './base';

export default class ChromeErrorParser extends BaseErrorParser {
  parseStack(stackLines: string[]): ErrorStack {
    return R.pipe<string[], string[], ErrorStack, ErrorStack>(
      R.tail,
      R.map((line) => {
        const [, , filenameMatch, columnMatch, lineMatch] = R.match(/(.*) (.*):(\d+):(\d+)$/, line);
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
