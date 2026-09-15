import { describe, expect, it } from "vitest";
import { nextAvailableDepartment, normalizeTeamRows, totalTeamSize } from "./teamAdoption";

describe("multidisciplinary adoption teams", () => {
  const departments = ["Computer Science & IT", "Civil Engineering", "Environmental Science"];

  it("finds the next unused department", () => {
    expect(nextAvailableDepartment([{ department: "Computer Science & IT", facultyName: "Dr. A", teamSize: 3 }], departments)).toBe("Civil Engineering");
  });

  it("keeps valid departmental allocations and enforces a one-student minimum", () => {
    expect(normalizeTeamRows([
      { department: "Civil Engineering", facultyName: " Dr. B ", teamSize: "4" },
      { department: "Environmental Science", facultyName: "Dr. C", teamSize: 0 },
      { department: "Computer Science & IT", facultyName: "", teamSize: 3 },
    ])).toEqual([
      { department: "Civil Engineering", facultyName: "Dr. B", teamSize: 4 },
      { department: "Environmental Science", facultyName: "Dr. C", teamSize: 1 },
    ]);
  });

  it("keeps the displayed total responsive while mentors are being entered", () => {
    expect(totalTeamSize([
      { department: "Civil Engineering", facultyName: "Dr. B", teamSize: 4 },
      { department: "Environmental Science", facultyName: "Dr. C", teamSize: 2 },
      { department: "Computer Science & IT", facultyName: "", teamSize: 8 },
    ])).toBe(14);
  });
});
