import assert from 'node:assert/strict';
import { test } from 'node:test';
import { jiraIssue, jiraIssues } from './jira.js';

test('jiraIssue builds Playwright issue annotation', () => {
  assert.deepEqual(jiraIssue('POS-30543'), {
    type: 'issue',
    description: 'https://devtickets.atlassian.net/browse/POS-30543',
  });
});

test('jiraIssues builds multiple issue annotations', () => {
  assert.deepEqual(jiraIssues(['POS-30543', 'POS-42889']), [
    {
      type: 'issue',
      description: 'https://devtickets.atlassian.net/browse/POS-30543',
    },
    {
      type: 'issue',
      description: 'https://devtickets.atlassian.net/browse/POS-42889',
    },
  ]);
});
