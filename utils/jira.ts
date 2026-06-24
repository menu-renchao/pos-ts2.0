export type JiraAnnotation = {
  type: 'issue';
  description: string;
};

export function jiraIssue(issueKey: string): JiraAnnotation {
  return {
    type: 'issue',
    description: `https://devtickets.atlassian.net/browse/${issueKey}`,
  };
}

export function jiraIssues(issueKeys: readonly string[]): JiraAnnotation[] {
  return issueKeys.map((issueKey) => jiraIssue(issueKey));
}
