# 🐸 TS MONADS

A collection of monads for TypeScript.

> I know that there is a lot ot monad libraries for TypeScript, but I wanted to create my own for learning purposes.

## [What is a monad?](#what-is-a-monad)

A monad is a design pattern used to simplify your code by abstracting away the boilerplate code needed by the program logic.
It's done by wrapping your data in a monad and then using the monad's methods to manipulate the data. Then you can unwrap the data when you need it.

If you are using Typescript you are already using monads. For example, the `Promise` class is a monad. You use it to abstract asynchronous operations then, when you need the data you unwrap it with the `await` keyword or the `then` method.

### [Result](#result)

The `Result` monad is used to represent the result of an operation that can fail. It's similar to the `Option` monad but it also contains an error message.

> Why? Because I don't like to throw errors. Thowing errors can be a little bit unpredictable. You can't know if the function will throw an error or not just by looking at the function signature. Also, you can't know what kind of error it will throw. With the `Result` monad you can know if the function can fail or not just by looking at the function signature. Also, you can know what kind of error it will throw.

```ts
import {
  ok,
  err,
  type Result,
  unwrap,
  unwrapErr,
  unwrapOr,
} from 'idk the package name yet';

type User = {
  id: number;
  name: string;
};

type Error = {
  message: string;
  path: string;
};

// Do something that could fail
function fetchUser(id: number): Result<User, Error> {
  if (id === 1) {
    // Wrap the value in ok when it's successful
    return ok({ id: 1, name: 'John' });
  }

  // Wrap the error in err when it fails
  return err({ message: 'User not found', path: `/users/${id}` });
}

const result = fetchUser(1);

// Threat result as ok
if (result.type === 'ok') {
  const value = unwrap(result);
  console.log(value.name);
}

// Threat result as error
if (result.type === 'err') {
  const error = unwrapErr(result);
  console.log(error.message);
}

// Set a default value
const value = unwrapOr(result, { id: 0, name: 'Default' });
console.log(value.name);
```
