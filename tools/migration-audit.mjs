import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const tableColumns = [
  'source_group',
  'source_file',
  'source_class',
  'source_test',
  'source_line',
  'jira_key',
  'allure_title',
  'target_spec',
  'target_test_title',
  'pages',
  'flows',
  'clients',
  'test_data',
  'assertions',
  'status',
  'gap_reason',
];

export function parsePythonSourceTests(sourceFile, content) {
  const sourceGroup = sourceFile.split('/')[0] ?? '';
  const tests = [];
  const decorators = [];
  const classDecorators = [];
  let sourceClass = '';
  let classSkipped = false;
  let classSkipReason = '';

  const lines = content.split(/\r?\n/);
  for (const [index, rawLine] of lines.entries()) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    if (trimmed.startsWith('@')) {
      decorators.push(trimmed);
      continue;
    }

    const classMatch = /^class\s+(Test\w*)\b/.exec(trimmed);
    if (classMatch) {
      sourceClass = classMatch[1] ?? '';
      classDecorators.splice(0, classDecorators.length, ...decorators);
      classSkipped = hasSkipDecorator(classDecorators);
      classSkipReason = readSkipReason(classDecorators);
      decorators.length = 0;
      continue;
    }

    const testMatch = /^def\s+(test_\w+)\s*\(/.exec(trimmed);
    if (testMatch) {
      const testSkipped = hasSkipDecorator(decorators);
      const skipped = classSkipped || testSkipped;
      const skipReason = classSkipped ? classSkipReason : readSkipReason(decorators);
      tests.push({
        sourceGroup,
        sourceFile,
        sourceClass,
        sourceTest: testMatch[1] ?? '',
        sourceLine: index + 1,
        jiraKey: readJiraKey(decorators),
        allureTitle: readAllureTitle(decorators),
        skipped,
        ...(skipped && skipReason ? { skipReason } : {}),
      });
      decorators.length = 0;
      continue;
    }

    decorators.length = 0;
  }

  return tests;
}

export function parseMigrationMap(markdown) {
  const rows = [];

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith('|') || line.includes('---')) {
      continue;
    }

    const cells = line
      .slice(1, line.endsWith('|') ? -1 : undefined)
      .split('|')
      .map((cell) => cell.trim());

    if (cells[0] === tableColumns[0] || cells.length !== tableColumns.length) {
      continue;
    }

    rows.push({
      sourceGroup: cells[0] ?? '',
      sourceFile: cells[1] ?? '',
      sourceClass: cells[2] ?? '',
      sourceTest: cells[3] ?? '',
      sourceLine: Number(cells[4] ?? '0'),
      jiraKey: cells[5] ?? '',
      allureTitle: cells[6] ?? '',
      targetSpec: cells[7] ?? '',
      targetTestTitle: cells[8] ?? '',
      pages: cells[9] ?? '',
      flows: cells[10] ?? '',
      clients: cells[11] ?? '',
      testData: cells[12] ?? '',
      assertions: cells[13] ?? '',
      status: cells[14] ?? '',
      gapReason: cells[15] ?? '',
    });
  }

  return rows;
}

export function auditMigrationCoverage(options) {
  const findings = [];
  const rowBySource = new Map();
  const projectFiles = options.projectFiles ?? new Map();
  const flowContractText = options.flowContractText ?? '';
  const migratedRows = options.mapRows.filter((row) => row.status === 'migrated' || row.status === 'verified');

  for (const row of options.mapRows) {
    const key = sourceKey(row.sourceFile, row.sourceClass, row.sourceTest, row.sourceLine);
    if (rowBySource.has(key)) {
      findings.push(`Duplicate map row for ${key}`);
    }
    rowBySource.set(key, row);
  }

  for (const sourceTest of options.sourceTests) {
    const row = rowBySource.get(sourceKey(sourceTest.sourceFile, sourceTest.sourceClass, sourceTest.sourceTest, sourceTest.sourceLine));
    if (!row) {
      findings.push(`Missing map row for ${sourceTest.sourceFile} ${sourceTest.sourceTest}`);
      continue;
    }

    if (sourceTest.jiraKey && row.jiraKey !== sourceTest.jiraKey) {
      findings.push(
        `Jira mismatch for ${sourceTest.sourceFile} ${sourceTest.sourceTest}: expected ${sourceTest.jiraKey}, got ${row.jiraKey}`,
      );
    }

    validateMappedRow(row, options, findings, projectFiles, flowContractText);
  }

  for (const row of options.mapRows) {
    if (
      !options.sourceTests.some(
        (test) =>
          sourceKey(test.sourceFile, test.sourceClass, test.sourceTest, test.sourceLine) ===
          sourceKey(row.sourceFile, row.sourceClass, row.sourceTest, row.sourceLine),
      )
    ) {
      findings.push(`Map row has no source test: ${row.sourceFile} ${row.sourceTest}`);
    }
  }

  if (options.strict) {
    for (const row of options.mapRows) {
      if (row.status !== 'verified') {
        findings.push(`Strict audit requires verified status: ${row.sourceFile} ${row.sourceTest} is ${row.status}`);
      }
    }
  }

  validateNoEmptyShellFiles(migratedRows, projectFiles, findings);

  const verifiedTestCount = options.mapRows.filter((row) => row.status === 'verified').length;
  const liveGapCount = options.mapRows.filter((row) => row.status === 'live-gap').length;

  return {
    ok: findings.length === 0,
    sourceTestCount: options.sourceTests.length,
    mappedTestCount: options.mapRows.length,
    verifiedTestCount,
    liveGapCount,
    findings,
  };
}

export function readSourceTestsFromRoot(sourceRoot, groups) {
  return groups.flatMap((group) => {
    const groupDir = path.join(sourceRoot, group);
    if (!existsSync(groupDir)) {
      throw new Error(`Source group does not exist: ${groupDir}`);
    }

    return readdirSync(groupDir)
      .filter((file) => /^test_.*\.py$/.test(file))
      .flatMap((file) => {
        const absolutePath = path.join(groupDir, file);
        const sourceFile = `${group}/${file}`;
        return parsePythonSourceTests(sourceFile, readFileSync(absolutePath, 'utf8'));
      });
  });
}

function validateMappedRow(row, options, findings, projectFiles, flowContractText) {
  if (row.status === 'migrated' || row.status === 'verified') {
    for (const [field, value] of [
      ['target_spec', row.targetSpec],
      ['target_test_title', row.targetTestTitle],
      ['pages', row.pages],
      ['flows', row.flows],
      ['clients', row.clients],
      ['test_data', row.testData],
      ['assertions', row.assertions],
    ]) {
      if (!value) {
        findings.push(`${row.status} row missing ${field}: ${row.sourceFile} ${row.sourceTest}`);
      }
    }
  }

  if (row.status === 'live-gap' && !row.gapReason) {
    findings.push(`Live gap row missing gap_reason: ${row.sourceFile} ${row.sourceTest}`);
  }

  if ((row.status === 'migrated' || row.status === 'verified') && row.targetSpec) {
    if (!options.targetSpecExists(row.targetSpec)) {
      findings.push(`Target spec does not exist: ${row.targetSpec}`);
      return;
    }

    const targetSpec = options.readTargetSpec(row.targetSpec);
    if (row.targetTestTitle && !containsTestTitle(targetSpec, row.targetTestTitle)) {
      findings.push(`Target spec missing runnable test title "${row.targetTestTitle}": ${row.targetSpec}`);
    }
    if (row.jiraKey && !targetSpec.includes(row.jiraKey)) {
      findings.push(`Target spec missing Jira key ${row.jiraKey}: ${row.targetSpec}`);
    }
    if (row.targetTestTitle && isTitleSkipped(targetSpec, row.targetTestTitle)) {
      findings.push(`Target test is skipped: ${row.targetSpec} ${row.targetTestTitle}`);
    }
    if (!hasRealAssertion(targetSpec)) {
      findings.push(`Target spec has no business assertion: ${row.targetSpec}`);
    }
    validateMethodReferences('flows', row.flows, projectFiles, findings, row);
    validateMethodReferences('pages', row.pages, projectFiles, findings, row);
    validateDataReferences('clients', row.clients, projectFiles, findings, row);
    validateDataReferences('test_data', row.testData, projectFiles, findings, row);
    validateSpecCallsFlow(row, targetSpec, findings);
    validateFlowContractCoverage(row, flowContractText, findings);
  }
}

function containsTestTitle(targetSpec, title) {
  return new RegExp(`\\btest(?:\\.only)?\\s*\\(\\s*['"\`]${escapeRegExp(title)}['"\`]`).test(targetSpec);
}

function isTitleSkipped(targetSpec, title) {
  return new RegExp(`\\btest\\.skip\\s*\\(\\s*['"\`]${escapeRegExp(title)}['"\`]`).test(targetSpec);
}

function hasRealAssertion(targetSpec) {
  if (!/\bexpect\s*\(/.test(targetSpec)) {
    return false;
  }
  return !/\bexpect\s*\(\s*true\s*\)\s*\.\s*toBe\s*\(\s*true\s*\)/.test(targetSpec);
}

function validateSpecCallsFlow(row, targetSpec, findings) {
  for (const reference of parseReferences(row.flows)) {
    const methodName = methodNameFromReference(reference);
    if (methodName && !new RegExp(`\\.${escapeRegExp(methodName)}\\s*\\(`).test(targetSpec)) {
      findings.push(`Target spec does not call flow method ${reference}: ${row.targetSpec}`);
    }
  }
}

function validateFlowContractCoverage(row, flowContractText, findings) {
  if (!flowContractText) {
    return;
  }
  for (const reference of parseReferences(row.flows)) {
    if (!flowContractText.includes(reference)) {
      findings.push(`Flow contract missing ${reference}: ${row.sourceFile} ${row.sourceTest}`);
    }
  }
}

function validateMethodReferences(field, value, projectFiles, findings, row) {
  for (const reference of parseReferences(value)) {
    const className = classNameFromReference(reference);
    const methodName = methodNameFromReference(reference);
    if (!className || !methodName) {
      findings.push(`${field} reference must name Class.method: ${reference} (${row.sourceFile} ${row.sourceTest})`);
      continue;
    }
    if (!classHasMethod(projectFiles, field === 'flows' ? 'flows/' : 'pages/', className, methodName)) {
      findings.push(`${field} method does not exist: ${reference} (${row.sourceFile} ${row.sourceTest})`);
    }
  }
}

function validateDataReferences(field, value, projectFiles, findings, row) {
  for (const reference of parseReferences(value)) {
    if (reference.endsWith('.ts')) {
      if (!projectFiles.has(normalizePath(reference))) {
        findings.push(`${field} file does not exist: ${reference} (${row.sourceFile} ${row.sourceTest})`);
      }
      continue;
    }

    const className = classNameFromReference(reference);
    const methodName = methodNameFromReference(reference);
    if (className && methodName) {
      const root = field === 'clients' ? 'clients/' : 'test-data/';
      if (!classHasMethod(projectFiles, root, className, methodName) && !projectTextIncludes(projectFiles, root, methodName)) {
        findings.push(`${field} reference does not exist: ${reference} (${row.sourceFile} ${row.sourceTest})`);
      }
      continue;
    }

    const root = field === 'clients' ? 'clients/' : 'test-data/';
    if (!projectTextIncludes(projectFiles, root, reference)) {
      findings.push(`${field} reference does not exist: ${reference} (${row.sourceFile} ${row.sourceTest})`);
    }
  }
}

function validateNoEmptyShellFiles(migratedRows, projectFiles, findings) {
  const referencedText = migratedRows
    .map((row) => `${row.pages} ${row.flows} ${row.clients} ${row.testData} ${row.targetSpec}`)
    .join(' ');
  const allProjectText = [...projectFiles.entries()]
    .map(([file, content]) => `${file}\n${content}`)
    .join('\n');

  for (const [file, content] of projectFiles.entries()) {
    if (!/^(pages|flows|clients)\//.test(file)) {
      continue;
    }
    for (const exportedName of readExportedNames(content)) {
      if (referencedText.includes(exportedName)) {
        continue;
      }
      const outsideOwnFile = allProjectText.replace(content, '').includes(exportedName);
      if (!outsideOwnFile) {
        findings.push(`Empty shell export is not referenced by migrated rows or code: ${file} ${exportedName}`);
      }
    }
  }
}

function readExportedNames(content) {
  const names = [];
  for (const match of content.matchAll(/\bexport\s+(?:abstract\s+)?(?:class|interface)\s+([A-Z]\w*)/g)) {
    names.push(match[1]);
  }
  return names;
}

function classHasMethod(projectFiles, root, className, methodName) {
  for (const [file, content] of projectFiles.entries()) {
    if (!file.startsWith(root)) {
      continue;
    }
    if (!new RegExp(`\\bclass\\s+${escapeRegExp(className)}\\b`).test(content)) {
      continue;
    }
    if (new RegExp(`\\b${escapeRegExp(methodName)}\\s*\\(`).test(content)) {
      return true;
    }
  }
  return false;
}

function projectTextIncludes(projectFiles, root, value) {
  for (const [file, content] of projectFiles.entries()) {
    if (file.startsWith(root) && content.includes(value)) {
      return true;
    }
  }
  return false;
}

function parseReferences(value) {
  return value
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function classNameFromReference(reference) {
  return /^([A-Z]\w*)\.(\w+)$/.exec(reference)?.[1] ?? '';
}

function methodNameFromReference(reference) {
  return /^([A-Z]\w*)\.(\w+)$/.exec(reference)?.[2] ?? '';
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readJiraKey(decorators) {
  return readDecoratorMatch(decorators, /jira_link\((?:'|")(POS-\d+)(?:'|")\)/);
}

function readAllureTitle(decorators) {
  return readDecoratorMatch(decorators, /allure\.title\((?:'|")(.+?)(?:'|")\)/);
}

function readSkipReason(decorators) {
  return readDecoratorMatch(decorators, /pytest\.mark\.skip\((?:'|")(.+?)(?:'|")\)/);
}

function hasSkipDecorator(decorators) {
  return decorators.some((decorator) => decorator.includes('pytest.mark.skip'));
}

function readDecoratorMatch(decorators, pattern) {
  for (const decorator of decorators) {
    const match = pattern.exec(decorator);
    if (match?.[1]) {
      return match[1];
    }
  }
  return '';
}

function sourceKey(sourceFile, sourceClass, sourceTest, sourceLine) {
  return `${sourceFile}::${sourceClass}::${sourceTest}:${sourceLine}`;
}

function runCli() {
  const cwd = process.cwd();
  const strict = process.argv.includes('--strict');
  const sourceRoot =
    process.env.POS_TS_SOURCE_ROOT ??
    path.resolve(cwd, '..', 'pos-regression-test', 'ui_autotest', 'case_pos', 'UI', 'pos_new_ui_case');
  const mapPath = path.join(cwd, 'docs', 'migration', 'source-to-target-map.md');
  const projectFiles = readProjectFiles(cwd, ['pages', 'flows', 'clients', 'test-data', 'tests']);
  const flowContractText = readProjectFiles(cwd, [path.join('docs', 'migration', 'flows')]);
  const sourceTests = readSourceTestsFromRoot(sourceRoot, ['crm', 'stage0', 'stage1', 'stage2', 'stage3', 'stage4']);
  const mapRows = parseMigrationMap(readFileSync(mapPath, 'utf8'));
  const result = auditMigrationCoverage({
    sourceTests,
    mapRows,
    strict,
    targetSpecExists: (targetSpec) => existsSync(path.join(cwd, targetSpec)),
    readTargetSpec: (targetSpec) => readFileSync(path.join(cwd, targetSpec), 'utf8'),
    projectFiles,
    flowContractText: [...flowContractText.values()].join('\n'),
  });

  console.log(`Migration audit ${result.ok ? 'passed' : 'failed'}.`);
  console.log(`Source tests: ${result.sourceTestCount}`);
  console.log(`Mapped tests: ${result.mappedTestCount}`);
  console.log(`Verified tests: ${result.verifiedTestCount}`);
  console.log(`Live gaps: ${result.liveGapCount}`);

  for (const finding of result.findings) {
    console.error(`- ${finding}`);
  }

  if (!result.ok) {
    process.exitCode = 1;
  }
}

function readProjectFiles(root, directories) {
  const files = new Map();
  for (const directory of directories) {
    const absoluteDirectory = path.join(root, directory);
    if (!existsSync(absoluteDirectory)) {
      continue;
    }
    for (const absoluteFile of listFiles(absoluteDirectory)) {
      if (!/\.(ts|mjs|md)$/.test(absoluteFile)) {
        continue;
      }
      files.set(normalizePath(path.relative(root, absoluteFile)), readFileSync(absoluteFile, 'utf8'));
    }
  }
  return files;
}

function listFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return listFiles(absolutePath);
    }
    return [absolutePath];
  });
}

function normalizePath(value) {
  return value.replace(/\\/g, '/');
}

const currentModulePath = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentModulePath) {
  runCli();
}
