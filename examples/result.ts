import { ok, err, Result, unwrap, unwrapErr, unwrapOr } from "../src/result";

type User = {
  id: number;
  name: string;
};

type Error = {
  message: string;
  path: string;
}

// Do something that could fail
function fetchUser(id: number): Result<User, Error> {
  if (id === 1) {
    // Wrap the value in ok when it's successful
    return ok({ id: 1, name: "John" });
  }

  // Wrap the error in err when it fails
  return err({ message: "User not found", path: `/users/${id}` });
}

const result = fetchUser(1);

// Threat result as ok
if (result.type === "ok") {
  const value = unwrap(result)
  console.log(value.name);
} 

// Threat result as error
if (result.type === "err") {
  const error = unwrapErr(result)
  console.log(error.message);
}

// Set a default value
const value = unwrapOr(result, { id: 0, name: "Default" });
console.log(value.name);
