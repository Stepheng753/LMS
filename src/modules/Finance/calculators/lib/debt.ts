export interface Debt {
  name: string;
  balance: number;
  apr: number; // percent
  minPayment: number;
}

export type Method = 'snowball' | 'avalanche' | 'minimum';

export interface PayoffResult {
  months: number;
  totalInterest: number;
  totalPaid: number;
  paidOff: { name: string; month: number }[];
  balances: number[]; // total balance at the end of each month (index 0 = start)
  neverPaid: boolean;
}

const MAX_MONTHS = 600;

// Monthly simulation. Interest accrues at apr/12 on the balance each month.
// Every minimum is paid; the extra budget (plus any freed-up minimums) rolls to the target debt.
export function simulatePayoff(debts: Debt[], extra: number, method: Method): PayoffResult {
  const ds = debts.filter((d) => d.balance > 0).map((d) => ({ ...d }));
  const total0 = ds.reduce((s, d) => s + d.balance, 0);
  const result: PayoffResult = { months: 0, totalInterest: 0, totalPaid: 0, paidOff: [], balances: [total0], neverPaid: false };
  if (ds.length === 0) return result;

  const budget = ds.reduce((s, d) => s + d.minPayment, 0) + (method === 'minimum' ? 0 : extra);
  let month = 0;
  while (ds.some((d) => d.balance > 0.005) && month < MAX_MONTHS) {
    month++;
    // accrue interest
    for (const d of ds) {
      if (d.balance <= 0) continue;
      const i = d.balance * (d.apr / 100 / 12);
      d.balance += i;
      result.totalInterest += i;
    }
    let available = method === 'minimum' ? 0 : budget;
    if (method === 'minimum') {
      for (const d of ds) {
        if (d.balance <= 0) continue;
        const pay = Math.min(d.balance, d.minPayment);
        d.balance -= pay;
        result.totalPaid += pay;
      }
    } else {
      // pay minimums first
      for (const d of ds) {
        if (d.balance <= 0) continue;
        const pay = Math.min(d.balance, d.minPayment);
        d.balance -= pay;
        available -= pay;
        result.totalPaid += pay;
      }
      // roll everything left to the target
      const open = ds.filter((d) => d.balance > 0.005);
      open.sort((a, b) => (method === 'snowball' ? a.balance - b.balance : b.apr - a.apr));
      for (const d of open) {
        if (available <= 0) break;
        const pay = Math.min(d.balance, available);
        d.balance -= pay;
        available -= pay;
        result.totalPaid += pay;
      }
    }
    for (const d of ds) {
      if (d.balance <= 0.005 && !result.paidOff.find((p) => p.name === d.name)) {
        d.balance = 0;
        result.paidOff.push({ name: d.name, month });
      }
    }
    result.balances.push(ds.reduce((s, d) => s + Math.max(0, d.balance), 0));
  }
  result.months = month;
  result.neverPaid = ds.some((d) => d.balance > 0.005);
  return result;
}
