import { catchError, map, Observable, of, startWith } from 'rxjs';

export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

type LoadingState<T> =
  | {
      status: 'loading';
    }
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'error';
      error: Error;
    };

export const loadingState = <Data>(
  state$: Observable<Data>
): Observable<LoadingState<Data>> =>
  state$.pipe(
    map(
      (data) =>
        ({
          data,
          status: 'success',
        } as const)
    ),
    startWith({
      status: 'loading',
    } as const),
    catchError((error) =>
      of({
        error,
        status: 'error',
      } as const)
    )
  );

export type ObservableLoader<T> = Observable<LoadingState<T>>;
