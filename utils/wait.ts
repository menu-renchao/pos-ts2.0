export type WaitUntilOptions = {
  timeoutMs?: number;
  intervalMs?: number;
  description?: string;
};

export async function waitUntil(
  predicate: () => Promise<boolean> | boolean,
  options: WaitUntilOptions = {},
): Promise<void> {
  const timeoutMs = options.timeoutMs ?? 10_000;
  const intervalMs = options.intervalMs ?? 100;
  const startedAt = Date.now();

  while (Date.now() - startedAt <= timeoutMs) {
    if (await predicate()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Timed out waiting for ${options.description ?? 'condition'}`);
}
