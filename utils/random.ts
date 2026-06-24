export function uniqueName(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`;
}

export function numericPhone(seed: number = Date.now()): string {
  return `555${String(seed).replace(/\D/g, '').slice(-7).padStart(7, '0')}`;
}
