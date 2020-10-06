import { ErrorStack } from '../src/types';
import ChromeErrorParser from '../src/parser/chrome';
import BaseErrorParser from '../src/parser/base';

describe('test chrome error parser', () => {
  let parser: BaseErrorParser;
  beforeEach(() => {
    parser = new ChromeErrorParser();
  });

  it('should parse message success', () => {
    const message = 'Hello Error';
    const errorMessage = parser.parseError(new Error(message));
    expect(errorMessage.message).toBe(message);
  });

  it('should parse stack success', () => {
    const stackMessage = parser.parseStack([
      'TypeError: Raise Error',
      'at bar http://192.168.31.8:8000/a.js:2:9',
      'at foo http://192.168.31.8:8000/b.js:21:1',
      'at baz http://192.168.31.8:8000/c.js:7:28',
    ]);

    const expected: ErrorStack = [
      { filename: 'http://192.168.31.8:8000/a.js', column: 2, line: 9 },
      { filename: 'http://192.168.31.8:8000/b.js', column: 21, line: 1 },
      { filename: 'http://192.168.31.8:8000/c.js', column: 7, line: 28 },
    ];

    expect(stackMessage).toEqual(expected);
  });

  it('should skip line without filename', () => {
    const stackMessage = parser.parseStack([
      'TypeError: Raise Error',
      'at <anonymous>:2:9',
      'at bar http://192.168.31.8:8000/a.js:2:9',
    ]);
    const expected: ErrorStack = [{ filename: 'http://192.168.31.8:8000/a.js', column: 2, line: 9 }];
    expect(stackMessage).toEqual(expected);
  });
});
