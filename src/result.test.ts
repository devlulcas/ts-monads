import {describe} from "vitest"
import {Err, Ok, isErr, isOk, unwrap, unwrapErr, Result, unwrapOr} from "./result"

describe("result", (it) => {
  it("should be ok", ({expect}) => {
    const result: Result<number, string> = {type: "ok", value: 1}
    expect(isOk(result)).toBe(true)
  })

  it("should be err", ({expect}) => {
    const result: Result<number, string> = {type: "err", error: "error"}
    expect(isErr(result)).toBe(true)
  })

  it("should unwrap ok", ({expect}) => {
    const result: Result<number, string> = {type: "ok", value: 1}
    expect(unwrap(result)).toBe(1)
  })

  it("should unwrap err", ({expect}) => {
    const result: Result<number, string> = {type: "err", error: "error"}
    expect(unwrapErr(result)).toBe("error")
  })

  it("should return default value on unwrapOr with err", ({expect}) => {
    const result: Result<number, string> = {type: "err", error: "error"}
    expect(unwrapOr(result, 1)).toBe(1)
  })

  it("should return value on unwrapOr with ok", ({expect}) => {
    const result: Result<number, string> = {type: "ok", value: 1}
    expect(unwrapOr(result, 2)).toBe(1)
  })

  it("should throw error on unwrapErr with ok", ({expect}) => {
    const result: Result<number, string> = {type: "ok", value: 1}
    expect(() => unwrapErr(result)).toThrow()
  })

  it("should throw value on unwrap with err", ({expect}) => {
    const result: Result<number, string> = {type: "err", error: "error"}
    expect(() => unwrap(result)).toThrow()
  })
})
