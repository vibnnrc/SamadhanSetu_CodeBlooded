export type TeamRow = {
  department: string;
  facultyName: string;
  teamSize: string | number;
};

export type AdoptedDepartment = {
  department: string;
  facultyName: string;
  teamSize: number;
};

export function nextAvailableDepartment(rows: TeamRow[], departments: string[]) {
  const used = new Set(rows.map((row) => row.department));
  return departments.find((department) => !used.has(department));
}

export function normalizeTeamRows(rows: TeamRow[]): AdoptedDepartment[] {
  return rows
    .filter((row) => row.department && row.facultyName.trim())
    .map((row) => ({
      department: row.department,
      facultyName: row.facultyName.trim(),
      teamSize: Math.max(1, Number(row.teamSize) || 1),
    }));
}

export function totalTeamSize(rows: TeamRow[]) {
  return rows
    .filter((row) => row.department)
    .reduce((total, row) => total + Math.max(1, Number(row.teamSize) || 0), 0);
}
