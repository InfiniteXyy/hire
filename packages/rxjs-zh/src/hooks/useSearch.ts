import { useCallback, useEffect, useReducer, useState } from 'react';
import { EMPTY, from, Subject, timer } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { mockFetch } from '../__mocks__/fetch';

type SearchState = {
  options: string[];
  isLoading: boolean;
  error: string;
};

type Action =
  | { type: 'Start' }
  | { type: 'Reset' }
  | { type: 'Fetched'; payload: string[] }
  | { type: 'Failed'; payload: string };

const reducer = (prevState: SearchState, action: Action): SearchState => {
  switch (action.type) {
    case 'Reset': {
      return { ...prevState, isLoading: false };
    }
    case 'Start': {
      return { ...prevState, isLoading: true, error: '' };
    }
    case 'Fetched': {
      return { ...prevState, isLoading: false, error: '', options: action.payload };
    }
    case 'Failed': {
      return { ...prevState, isLoading: false, error: action.payload, options: [] };
    }
    default: {
      return prevState;
    }
  }
};

// useSwr is a better choice here ?

export default function useSearch(): SearchState & { trigger: (value: string) => void } {
  const [searchSubject$] = useState(() => new Subject<string>());
  const [state, dispatch] = useReducer(reducer, { error: '', isLoading: false, options: [] });

  const trigger = useCallback(
    (value: string) => {
      searchSubject$.next(value);
    },
    [searchSubject$]
  );

  useEffect(() => {
    const subscription = searchSubject$
      .pipe(
        switchMap((input) => {
          dispatch({ type: 'Reset' });
          if (input.length >= 30) {
            dispatch({ type: 'Failed', payload: 'Too much words' });
            return EMPTY;
          }
          return timer(500).pipe(
            tap(() => dispatch({ type: 'Start' })),
            switchMap(() =>
              from(mockFetch(input)).pipe(
                catchError(() => {
                  dispatch({ type: 'Failed', payload: 'Net Error' });
                  return EMPTY;
                })
              )
            )
          );
        })
      )
      .subscribe((response) => {
        dispatch({ type: 'Fetched', payload: response });
      });
    return () => subscription.unsubscribe();
  }, [searchSubject$]);

  return { ...state, trigger };
}
