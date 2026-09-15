import { describe, expect, it } from "vitest";
import { parseModerationSummary, parseProposalDraft, validateEvidenceUpload } from "./collaborationFeatures";

describe("collaboration feature validators", () => {
  it("accepts a structured proposal draft", () => {
    expect(parseProposalDraft('{"title":"Community air-quality monitoring network","summary":"Deploy low-cost sensors at priority locations and train local volunteers to publish weekly readings for residents and the municipal team."}').title).toBe("Community air-quality monitoring network");
  });

  it("accepts a concise moderation summary", () => {
    expect(parseModerationSummary('{"summary":"Residents in Bokaro report worsening industrial haze and respiratory concerns, with no public real-time air-quality data."}')).toContain("Bokaro");
  });

  it("rejects unsupported and oversized evidence uploads", () => {
    expect(() => validateEvidenceUpload("notes.exe", "application/x-msdownload", "YQ==")).toThrow("not supported");
    expect(() => validateEvidenceUpload("evidence.pdf", "application/pdf", "")).toThrow("between 1 byte");
  });
});
