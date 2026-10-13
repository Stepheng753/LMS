export interface RetireYear {
  year: number;
  start: number;
  growth: number;
  withdrawal: number;
  end: number;
  real: number; // end balance in today's dollars
}

export interface RetireInput {
  portfolio: number;
  withdrawPct: number; // first-year withdrawal as % of the starting portfolio
  rate: number; // nominal return %
  inflation: number; // %
  years: number;
  raiseWithInflation: boolean; // true: withdrawal grows with inflation (keeps buying power)
}

// Growth first, then the withdrawal at the end of each year.
export function simulateRetirement(i: RetireInput): RetireYear[] {
  const rows: RetireYear[] = [];
  let bal = i.portfolio;
  let w = (i.portfolio * i.withdrawPct) / 100;
  for (let y = 1; y <= i.years; y++) {
    const start = bal;
    const growth = start * (i.rate / 100);
    const withdrawal = Math.min(w, start + growth);
    bal = start + growth - withdrawal;
    rows.push({ year: y, start, growth, withdrawal, end: bal, real: bal / Math.pow(1 + i.inflation / 100, y) });
    if (i.raiseWithInflation) w *= 1 + i.inflation / 100;
    if (bal <= 0) break;
  }
  return rows;
}

// The thinking: portfolio x withdrawal% = yearly expenses  =>  portfolio = expenses / withdrawal%.
export const neededPortfolio = (yearlyExpenses: number, withdrawPct: number) =>
  withdrawPct > 0 ? yearlyExpenses / (withdrawPct / 100) : Infinity;
