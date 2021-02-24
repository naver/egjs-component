import assert from "static-type-assert";

import ComponentEvent from "../../declaration/ComponentEvent";

import { test } from "./type-utils";

// ✅
test("Can be created without properties", () => {
  assert<"test">(new ComponentEvent("test").eventType);
  assert<any>(new ComponentEvent("test").currentTarget);
});

test("Can be created with properties", () => {
  assert<number>(new ComponentEvent("test", { a: 1, b: 2 }).a);
  assert<number>(new ComponentEvent("test", { a: 1, b: 2 }).b);
});
