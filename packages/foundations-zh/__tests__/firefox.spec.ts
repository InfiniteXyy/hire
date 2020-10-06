import { ErrorStack } from '../src/types';
import BaseErrorParser from '../src/parser/base';
import FirefoxErrorParser from '../src/parser/firefox';

describe('test firefox error parser', () => {
  let parser: BaseErrorParser;
  beforeEach(() => {
    parser = new FirefoxErrorParser();
  });

  it('should parse message success', () => {
    const message = 'Hello Error';
    const errorMessage = parser.parseError(new Error(message));
    expect(errorMessage.message).toBe(message);
  });

  it('should parse stack success', () => {
    const stackMessage = parser.parseStack([
      'bar@http://192.168.31.8:8000/a.js:2:9',
      'foo@http://192.168.31.8:8000/b.js:21:1',
      'calc@http://192.168.31.8:8000/c.js:7:28',
      '<anonymous>:1:11',
    ]);

    const expected: ErrorStack = [
      { filename: 'http://192.168.31.8:8000/a.js', column: 2, line: 9 },
      { filename: 'http://192.168.31.8:8000/b.js', column: 21, line: 1 },
      { filename: 'http://192.168.31.8:8000/c.js', column: 7, line: 28 },
    ];

    expect(stackMessage).toEqual(expected);
  });

  it('should skip line without filename', () => {
    const stackMessage = parser.parseStack(['bar@http://192.168.31.8:8000/a.js:2:9', '<anonymous>:1:11']);
    const expected: ErrorStack = [{ filename: 'http://192.168.31.8:8000/a.js', column: 2, line: 9 }];
    expect(stackMessage).toEqual(expected);
  });
});
