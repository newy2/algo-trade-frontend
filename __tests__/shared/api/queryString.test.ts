import { assert, describe, test } from "vitest";
import { toQueryString } from "../../../src/shared/api/toQueryString";

describe("toQueryString", () => {
  test("빈 object 인 경우", () => {
    const queryString = toQueryString({});

    assert.equal(queryString, "");
  });

  test("object 의 value 에 array 가 없는 경우", () => {
    const queryString = toQueryString({
      user: "jay",
      groups: 1,
      isAdmin: true,
    });

    assert.equal(queryString, "user=jay&groups=1&isAdmin=true");
  });

  test("object 의 value 에 length 가 1 인 array 가 있는 경우", () => {
    const queryString = toQueryString({
      user: "jay",
      groups: [1],
      isAdmin: true,
    });

    assert.equal(queryString, "user=jay&groups=1&isAdmin=true");
  });

  test("object 의 value 에 length 가 2인 array 가 있는 경우", () => {
    const queryString = toQueryString({
      user: "jay",
      groups: [1, 2],
      isAdmin: true,
    });

    assert.equal(queryString, "user=jay&groups=1&groups=2&isAdmin=true");
  });
});
