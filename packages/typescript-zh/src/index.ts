interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;

  message = 'hello!';

  delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: 'delay',
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: 'set-message',
    };
  }
}

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type GetFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? K : never;
}[keyof T];

type OmitPrimitive<T> = Pick<T, GetFunctionKeys<T>>;

type Connect<T> = (
  module: T
) => {
  [K in keyof OmitPrimitive<T>]: T[K] extends (arg: Action<infer A>) => Action<infer R>
    ? (arg: A) => Action<R>
    : T[K] extends (arg: Promise<infer A2>) => Promise<Action<infer R2>>
    ? (arg: A2) => Action<R2>
    : never;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const connect: Connect<EffectModule> = (m) => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delay: (input: number) => ({
    type: 'delay',
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: 'set-message',
    payload: input.getMilliseconds(),
  }),
});

// type Connected = {
//   delay(input: number): Action<string>;
//   setMessage(action: Date): Action<number>;
// };

export const connected = connect(new EffectModule());
