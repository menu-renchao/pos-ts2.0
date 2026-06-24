import { MigrationDataError } from './errors.js';

export function parseCurrency(value: string): number {
  const normalized = value.trim().replace(/[$,]/g, '');
  const amount = Number(normalized);
  if (!Number.isFinite(amount)) {
    throw new MigrationDataError(`Invalid currency value: ${value}`);
  }
  return Math.round(amount * 100) / 100;
}

export function parsePercent(value: string): number {
  const normalized = value.trim().replace('%', '');
  const percent = Number(normalized);
  if (!Number.isFinite(percent)) {
    throw new MigrationDataError(`Invalid percent value: ${value}`);
  }
  return percent / 100;
}

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
