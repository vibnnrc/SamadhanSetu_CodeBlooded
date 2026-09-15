export type NewProblemNotificationInput = {
  problemId: string;
  title: string;
  district: string;
};

export function buildNewProblemNotification(input: NewProblemNotificationInput) {
  return {
    problemId: input.problemId,
    title: "New civic problem logged",
    body: `${input.title} · ${input.district}`,
  };
}
