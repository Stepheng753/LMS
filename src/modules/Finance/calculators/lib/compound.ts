export interface YearRow {
  year: number;
  start: number;
  contribution: number;
  growth: number;
  end: number;
  contributed: number; // cumulative money you put in (incl. starting balance)
  real: number; // end balance in today's dollars
}

export interface CompoundInput {
  start: number; // starting balance
  yearly: number; // contribution each year
  rate: number; // percent per year
  years: number;
  inflation?: number; // percent per year
  timing?: 'end' | 'begin'; // when each year's contribution lands
}

// Annual compounding. Contribution at the end of the year (default) earns nothing that year.
export function compound({ start, yearly, rate, years, inflation = 0, timing = 'end' }: CompoundInput): YearRow[] {
  const r = rate / 100;
  const inf = inflation / 100;
  const rows: YearRow[] = [];
  let balance = start;
  let contributed = start;
  for (let y = 1; y <= years; y++) {
    const startBal = balance;
    let growth: number;
    if (timing === 'begin') {
      growth = (startBal + yearly) * r;
    } else {
      growth = startBal * r;
    }
    balance = startBal + yearly + growth;
    contributed += yearly;
    rows.push({
      year: y,
      start: startBal,
      contribution: yearly,
      growth,
      end: balance,
      contributed,
      real: balance / Math.pow(1 + inf, y),
    });
  }
  return rows;
}

// Real (inflation-adjusted) rate by the Fisher equation, in percent.
export const realRate = (nominal: number, inflation: number) =>
  ((1 + nominal / 100) / (1 + inflation / 100) - 1) * 100;

// Rule of 72: roughly how many years to double.
export const yearsToDouble = (rate: number) => (rate > 0 ? Math.log(2) / Math.log(1 + rate / 100) : Infinity);
