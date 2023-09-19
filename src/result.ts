/**
 * Type signature of an successful result.
 * It contains the value of the result and a type tag.
 */
export type Ok<T> = { type: 'ok', value: T };

/**
 * Type signature of an unsuccessful result.
 * It container and error value and a type tag.
 */
export type Err<E> = { type: 'err', error: E };

/**
 * Type signature of a result.
 * It should be either an `Ok` or an `Err`.
 * You can create a result using the `ok` and `err` functions. 
 * 
 * @example
 * const result: Result<number, string> = ok(42);
 * const result: Result<number, string> = err('Something went wrong');
 */
export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Wrap a value in an `Ok` result.
 * @param value A value to wrap in an `Ok`
 * @returns An `Ok` result
 */
export const ok = <T>(value: T): Ok<T> => ({ type: 'ok', value });

/**
 * Wrap an error in an `Err` result.
 * @param error An error to wrap in an `Err`
 * @returns An `Err` result
 */
export const err = <E>(error: E): Err<E> => ({ type: 'err', error });

/**
 * Check if a result is an `Ok`.
 * @param result Value to check
 * @returns `true` if the result is an `Ok`, `false` otherwise
 */
export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> => result.type === 'ok';

/**
 * Check if a result is an `Err`.
 * @param result Value to check
 * @returns `true` if the result is an `Err`, `false` otherwise
 */
export const isErr = <T, E>(result: Result<T, E>): result is Err<E> => result.type === 'err';

/**
 * Unwrap a result. Brings the value back from monad land.
 * @param result A result to unwrap
 * @returns The value of the result if it's an `Ok`. 
 * @throws The error of the result if it's an `Err`
 */
export const unwrap = <T, E>(result: Result<T, E>): T => {
  if (isOk(result)) {
    return result.value;
  }

  throw result.error;
};

/**
 * Unwrap an error. Brings the error back from monad land.
 * @param result A result to unwrap
 * @returns The error of the result if it's an `Err`.
 * @throws The value of the result if it's an `Ok`
 */
export const unwrapErr = <T, E>(result: Result<T, E>): E => {
  if (isErr(result)) {
    return result.error;
  }

  throw result.value;
};

/**
 * Unwrap a result or return a default value.
 * @param result A result to unwrap
 * @param defaultValue A default value to return if the result is an `Err`
 * @returns The value of the result if it's an `Ok`. The default value otherwise.
 */
export const unwrapOr = <T, E>(result: Result<T, E>, defaultValue: T): T => {
  if (isOk(result)) {
    return result.value;
  }

  return defaultValue;
};

/**
 * Unwrap a result or execute a function to return a default value.
 * @param result A result to unwrap
 * @param defaultValue A function that returns a default value to return if the result is an `Err`
 * @returns The value of the result if it's an `Ok`. The default value otherwise.
 */
export const unwrapOrElse = <T, E>(result: Result<T, E>, defaultValue: () => T): T => {
  if (isOk(result)) {
    return result.value;
  }

  return defaultValue();
};

/**
 * Map a result to a new result.
 * @param result A result to map
 * @param f A function to map the value of the result
 * @returns A new result with the mapped value
 */
export const map = <T, E, U>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> => {
  if (isOk(result)) {
    return ok(fn(result.value));
  }

  return result;
};

/**
 * Map a result to a new result.
 * @param result A result to map
 * @param f A function to map the error of the result
 * @returns A new result with the mapped error
 */
export const mapErr = <T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F> => {
  if (isErr(result)) {
    return err(fn(result.error));
  }

  return result;
}
