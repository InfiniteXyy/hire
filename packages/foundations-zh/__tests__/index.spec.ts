import { getErrorParser, parseError } from '../src';

describe('test parseError function', () => {
  it('should parse error works', () => {
    const error = new Error('message');
    error.stack = `TypeError: message
                    at bar http://192.168.31.8:8000/c.js:2:9`;
    const message = parseError(error);
    expect(message).toEqual({
      message: 'message',
      stack: [
        {
          column: 2,
          filename: 'http://192.168.31.8:8000/c.js',
          line: 9,
        },
      ],
    });
  });

  it('should work when specify parser', () => {
    const error = new Error('message');
    error.stack = `bar@http://192.168.31.8:8000/c.js:2:9`;
    const message = parseError(error, getErrorParser('Firefox'));
    expect(message).toEqual({
      message: 'message',
      stack: [{ column: 2, filename: 'http://192.168.31.8:8000/c.js', line: 9 }],
    });
  });
});
