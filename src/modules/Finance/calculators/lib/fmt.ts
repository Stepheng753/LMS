export const money = (n: number, digits = 0): string => {
  const v = Number.isFinite(n) ? n : 0;
  const s = Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  return `${v < 0 ? '-' : ''}$${s}`;
};

export const pct = (n: number, digits = 1): string => `${(Number.isFinite(n) ? n : 0).toFixed(digits)}%`;

// Compact for chart axes: $1.2M, $850k
export const moneyShort = (n: number): string => {
  const a = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  if (a >= 1_000_000) return `${sign}$${(a / 1_000_000).toFixed(a >= 10_000_000 ? 0 : 1)}M`;
  if (a >= 1_000) return `${sign}$${Math.round(a / 1_000)}k`;
  return `${sign}$${Math.round(a)}`;
};

export const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
