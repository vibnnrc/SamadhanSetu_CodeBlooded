import { describe, expect, it } from "vitest";
import { buildNewProblemNotification } from "./notificationFeatures";

describe("new problem notifications", () => {
  it("creates a concise all-user notification payload", () => {
    expect(buildNewProblemNotification({ problemId: "42", title: "Unsafe school road", district: "Ranchi" })).toEqual({
      problemId: "42",
      title: "New civic problem logged",
      body: "Unsafe school road · Ranchi",
    });
  });
});
