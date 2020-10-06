import BaseErrorParser from './base';
import ChromeErrorParser from './chrome';
import FirefoxErrorParser from './firefox';

type Agent = 'Chrome' | 'Firefox';

export default function getErrorParser(agent?: Agent): BaseErrorParser {
  switch (agent) {
    case 'Firefox': {
      return new FirefoxErrorParser();
    }
    case 'Chrome': {
      return new ChromeErrorParser();
    }
    default: {
      // according to user-agent or something else
      return new ChromeErrorParser();
    }
  }
}
