import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, DataTable, Note, GroupLabel } from './ui';
import { LineChart } from './charts';
import { Debt, simulatePayoff } from './lib/debt';
import { money, moneyShort } from './lib/fmt';

const START: Debt[] = [
  { name: 'Store card', balance: 800, apr: 26, minPayment: 35 },
  { name: 'Credit card', balance: 4500, apr: 22, minPayment: 110 },
  { name: 'Car loan', balance: 14000, apr: 9, minPayment: 340 },
  { name: 'Personal loan', balance: 3200, apr: 14, minPayment: 120 },
];

// Snowball (smallest balance first) vs avalanche vs paying only the minimums.
interface Props {
  debts?: Debt[];
  extra?: number;
}

export const DebtPayoff: React.FC<Props> = ({ debts: d0 = START, extra: e0 = 300 }) => {
  const [debts, setDebts] = useState<Debt[]>(d0);
  const [extra, setExtra] = useState(e0);

  const set = (i: number, patch: Partial<Debt>) => setDebts((d) => d.map((x, k) => (k === i ? { ...x, ...patch } : x)));

  const sim = useMemo(
    () => ({
      min: simulatePayoff(debts, 0, 'minimum'),
      snow: simulatePayoff(debts, extra, 'snowball'),
      aval: simulatePayoff(debts, extra, 'avalanche'),
    }),
    [debts, extra]
  );
  const total = debts.reduce((s, d) => s + d.balance, 0);
  const minTotal = debts.reduce((s, d) => s + d.minPayment, 0);
  const months = (n: number, never: boolean) => (never ? '50+ years' : `${Math.floor(n / 12)}y ${n % 12}m`);
  const len = Math.max(sim.min.balances.length, sim.snow.balances.length, sim.aval.balances.length);
  const pts = (b: number[]) => Array.from({ length: Math.min(len, 121) }, (_, i) => ({ x: i, y: b[Math.min(i, b.length - 1)] ?? 0 }));

  return (
    <CalcFrame
      title="Debt payoff: snowball vs avalanche"
      subtitle="Edit your debts and your extra monthly payment. Snowball pays the smallest balance first. Avalanche pays the highest rate first."
      presets={[
        { label: 'Reset example', apply: () => { setDebts(START); setExtra(300); } },
        { label: 'Snowball and avalanche differ', apply: () => { setDebts([{ name: 'Medical bill', balance: 1200, apr: 0, minPayment: 50 }, { name: 'Credit card', balance: 9000, apr: 27, minPayment: 220 }, { name: 'Car loan', balance: 4000, apr: 8, minPayment: 200 }]); setExtra(250); } },
        { label: 'No extra, just minimums', apply: () => setExtra(0) },
        { label: 'Extra $800', apply: () => setExtra(800) },
      ]}
      inputs={
        <>
          {debts.map((d, i) => (
            <div key={i} className="space-y-2">
              <GroupLabel>{d.name}</GroupLabel>
              <div className="grid grid-cols-3 gap-2">
                <NumField label="Balance" value={d.balance} onChange={(n) => set(i, { balance: n })} prefix="$" min={0} step={100} />
                <NumField label="Rate (APR)" value={d.apr} onChange={(n) => set(i, { apr: n })} suffix="%" min={0} max={40} step={0.5} />
                <NumField label="Minimum" value={d.minPayment} onChange={(n) => set(i, { minPayment: n })} prefix="$" min={0} step={5} />
              </div>
            </div>
          ))}
          <NumField label="Extra you can pay each month" value={extra} onChange={setExtra} prefix="$" min={0} step={50} slider max={2000} help={`on top of ${money(minTotal)} in minimums`} />
        </>
      }
      results={
        <>
          <Stats cols={3}>
            <Stat label="Only minimums" value={months(sim.min.months, sim.min.neverPaid)} sub={`interest ${money(sim.min.totalInterest)}`} tone="bad" />
            <Stat label="Snowball" value={months(sim.snow.months, sim.snow.neverPaid)} sub={`interest ${money(sim.snow.totalInterest)}`} tone="good" />
            <Stat label="Avalanche" value={months(sim.aval.months, sim.aval.neverPaid)} sub={`interest ${money(sim.aval.totalInterest)}`} />
          </Stats>
          <Stats>
            <Stat label="Total owed today" value={money(total)} />
            <Stat label="Snowball vs minimums" value={`saves ${money(sim.min.totalInterest - sim.snow.totalInterest)}`} sub="in interest" tone="good" />
            <Stat label="Avalanche vs snowball" value={`${money(Math.max(0, sim.snow.totalInterest - sim.aval.totalInterest))} cheaper`} sub="math says avalanche. Motivation says snowball" />
            <Stat label="First debt gone" value={sim.snow.paidOff[0] ? `month ${sim.snow.paidOff[0].month}` : 'n/a'} sub={sim.snow.paidOff[0]?.name ?? ''} />
          </Stats>
          <Note>Each month: interest is added (APR / 12), every minimum is paid, and everything else goes to the target debt. When a debt dies, its payment rolls to the next. That roll is the snowball.</Note>
        </>
      }
      below={
        <>
          <LineChart
            title="Total debt, month by month"
            xLabel="Month"
            format={moneyShort}
            series={[
              { name: 'Only minimums', points: pts(sim.min.balances), color: '#b91c1c' },
              { name: 'Snowball', points: pts(sim.snow.balances) },
              { name: 'Avalanche', points: pts(sim.aval.balances), color: '#0f766e', dashed: true },
            ]}
          />
          <DataTable headers={['Snowball order', 'Paid off in month']} rows={sim.snow.paidOff.map((p) => [p.name, p.month])} maxHeight={200} />
        </>
      }
    />
  );
};
