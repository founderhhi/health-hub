export interface RetryOptions {
  attempts?: number;
  initialDelayMs?: number;
  backoffMultiplier?: number;
  maxDelayMs?: number;
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  attempts: 6,
  initialDelayMs: 250,
  backoffMultiplier: 1.6,
  maxDelayMs: 2500
};

export async function sleep(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

export async function retry<T>(
  fn: (attempt: number) => Promise<T | null | undefined>,
  options?: RetryOptions
): Promise<T> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  let delayMs = config.initialDelayMs;
  let lastError: unknown;

  for (let attempt = 1; attempt <= config.attempts; attempt += 1) {
    try {
      const result = await fn(attempt);
      if (result !== null && result !== undefined) {
        return result;
      }
    } catch (error) {
      lastError = error;
    }

    if (attempt < config.attempts) {
      await sleep(delayMs);
      delayMs = Math.min(
        Math.round(delayMs * config.backoffMultiplier),
        config.maxDelayMs
      );
    }
  }

  if (lastError) {
    throw lastError;
  }

  throw new Error(`Retry exhausted after ${config.attempts} attempts.`);
}
