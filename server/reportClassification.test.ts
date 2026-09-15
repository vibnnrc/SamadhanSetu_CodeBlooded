import { describe, expect, it } from "vitest";
import { isReportCategory, parseClassification } from "./reportClassification";

describe("report classification validation", () => {
  it("accepts a supported classification result", () => {
    expect(parseClassification('{"category":"water","reasoning":"Fluoride contamination and hand-pump supply are water-management concerns."}')).toEqual({
      category: "water",
      reasoning: "Fluoride contamination and hand-pump supply are water-management concerns.",
    });
  });

  it("rejects an unsupported category returned by a model", () => {
    expect(() => parseClassification('{"category":"other","reasoning":"A valid-looking reason."}')).toThrow("unsupported category");
  });

  it("exposes only the civic categories used by the report form", () => {
    expect(isReportCategory("infrastructure")).toBe(true);
    expect(isReportCategory("transport")).toBe(false);
  });
});
