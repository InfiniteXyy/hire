import { ErrorMessage } from './types';
import getErrorParser from './parser';
import BaseErrorParser from './parser/base';

export function parseError(err: Error, parser?: BaseErrorParser): ErrorMessage {
  if (!err.stack) throw new Error('error has no stack tracked');
  if (!parser) return getErrorParser().parseError(err);
  return parser.parseError(err);
}

export { default as ChromeErrorParser } from './parser/chrome';
export { default as FirefoxErrorParser } from './parser/firefox';
export { getErrorParser };
