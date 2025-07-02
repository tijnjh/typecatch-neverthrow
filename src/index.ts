import { err, ok, type Result } from "neverthrow";

/**
 * Executes a function and returns a Result containing either the success value or an error.
 * @param fn A function to execute.
 * @returns A Result object with either a success value or an error.
 */
export function tryCatch<T, E = Error>(fn: () => T): Result<T, E>;

/**
 * Executes a promise and returns a promise that resolves to a Result containing either the success value or an error.
 * @param promise A promise to execute.
 * @returns A promise that resolves to a Result object with either a success value or an error.
 */
export function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>>;

export function tryCatch<T, E = Error>(
  input: (() => T) | Promise<T>
): Result<T, E> | Promise<Result<T, E>> {
  if (typeof input === "function") {
    try {
      return ok(input());
    } catch (error) {
      return err(error);
    }
  }

  if (input instanceof Promise) {
    return input.then((data) => ok(data)).catch((error) => err(error));
  }

  return err(new Error("Input must be a function or a promise.") as E);
}

const url = tryCatch(() => new URL("diasjd"));

if (!url.isErr()) {
  url.value;
}

const data = await tryCatch<{ item: string }>(
  fetch("https://example.com").then((res) => res.json())
);

if (!data.isErr()) {
  data.value;
}
