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

type SyncActionCreator<A, R> = (arg: Action<A>) => Action<R>;
type AsyncActionCreator<A, R> = (arg: Promise<A>) => Promise<Action<R>>;

type Connect<T> = (
  module: T
) => {
  [K in keyof OmitPrimitive<T>]: T[K] extends SyncActionCreator<infer A, infer R>
    ? (arg: A) => Action<R>
    : T[K] extends AsyncActionCreator<infer A2, infer R2>
    ? (arg: A2) => Action<R2>
    : never;
};

const connect: Connect<EffectModule> = () => ({
  delay: (input: number) => ({
    type: 'delay',
    payload: `hello ${input}`,
  }),
  setMessage: (input: Date) => ({
    type: 'set-message',
    payload: input.getMilliseconds(),
  }),
});

export const connected = connect(new EffectModule());
