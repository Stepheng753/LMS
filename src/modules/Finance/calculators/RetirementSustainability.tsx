import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Toggle, Stat, Stats, MathBlock, DataTable, Note } from './ui';
import { LineChart } from './charts';
import { simulateRetirement } from './lib/retire';
import { realRate } from './lib/compound';
import { money, moneyShort, pct } from './lib/fmt';

interface Props {
  portfolio?: number;
  withdrawPct?: number;
  rate?: number;
  inflation?: number;
  years?: number;
  raise?: boolean;
  title?: string;
}

export const RetirementSustainability: React.FC<Props> = ({ portfolio: p0 = 1000000, withdrawPct: w0 = 4, rate: r0 = 4, inflation: i0 = 0, years: y0 = 30, raise: raise0 = false, title = 'Does the money last?' }) => {
  const [portfolio, setPortfolio] = useState(p0);
  const [withdrawPct, setW] = useState(w0);
  const [rate, setRate] = useState(r0);
  const [inflation, setInflation] = useState(i0);
  const [years, setYears] = useState(y0);
  const [raise, setRaise] = useState(raise0);

  const rows = useMemo(() => simulateRetirement({ portfolio, withdrawPct, rate, inflation, years: Math.max(1, Math.round(years)), raiseWithInflation: raise }), [portfolio, withdrawPct, rate, inflation, years, raise]);
  const first = rows[0];
  const last = rows[rows.length - 1];
  const lasted = last.end > 0.5;
  const withdrawal1 = (portfolio * withdrawPct) / 100;

  return (
    <CalcFrame
      title={title}
      subtitle="You do not spend the pile. You spend a percentage of it each year, and the market keeps growing the rest."
      presets={[
        { label: '4% out, 4% growth: balance never moves', apply: () => { setW(4); setRate(4); setInflation(0); setRaise(false); } },
        { label: '4% out, 10.5% growth', apply: () => { setW(4); setRate(10.5); setInflation(0); setRaise(false); } },
        { label: 'Add 3% inflation, raise withdrawals', apply: () => { setW(4); setRate(10.5); setInflation(3); setRaise(true); } },
        { label: 'Weak market: 4% out, 2% growth', apply: () => { setW(4); setRate(2); setInflation(0); setRaise(false); } },
        { label: 'Too greedy: 8% out', apply: () => { setW(8); setRate(7); setInflation(3); setRaise(true); } },
      ]}
      inputs={
        <>
          <NumField label="Invested at retirement" value={portfolio} onChange={setPortfolio} prefix="$" min={0} step={50000} slider max={5000000} />
          <NumField label="Withdraw each year (first year, % of the pile)" value={withdrawPct} onChange={setW} suffix="%" min={0} max={15} step={0.25} slider />
          <NumField label="Yearly market return" value={rate} onChange={setRate} suffix="%" min={-10} max={20} step={0.5} slider />
          <NumField label="Inflation" value={inflation} onChange={setInflation} suffix="%" min={0} max={10} step={0.25} />
          <NumField label="Years of retirement" value={years} onChange={setYears} suffix="years" min={1} max={60} slider />
          <Toggle label="Raise the withdrawal with inflation" checked={raise} onChange={setRaise} help="so your spending keeps its buying power" />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="First year: growth" value={money(first.growth)} sub={`${pct(rate)} of ${money(portfolio)}`} tone="good" />
            <Stat label="First year: you spend" value={money(first.withdrawal)} sub={`${pct(withdrawPct)} of ${money(portfolio)}`} />
            <Stat label={`After ${rows.length} years`} value={money(last.end)} tone={lasted ? 'good' : 'bad'} sub={lasted ? `${money(last.real)} in today's dollars` : `ran out in year ${rows.length}`} />
            <Stat label="Real return per year" value={pct(realRate(rate, inflation), 2)} sub="growth after inflation" />
          </Stats>
          <MathBlock
            lines={[
              { label: 'You withdraw', formula: `${money(portfolio)} x ${withdrawPct}%`, value: money(withdrawal1) },
              { label: 'The market adds', formula: `${money(portfolio)} x ${rate}%`, value: money(first.growth) },
              { label: 'Balance after year 1', formula: `${money(portfolio)} + ${money(first.growth)} - ${money(first.withdrawal)}`, value: money(first.end), strong: true },
              { label: 'If growth equals the withdrawal %', formula: 'what you take out is what the pile earned', value: 'balance stays flat' },
            ]}
          />
        </>
      }
      below={
        <>
          <LineChart title="Balance through retirement" format={moneyShort} series={[{ name: 'Balance', points: [{ x: 0, y: portfolio }, ...rows.map((r) => ({ x: r.year, y: r.end }))] }, ...(inflation > 0 ? [{ name: "In today's dollars", points: [{ x: 0, y: portfolio }, ...rows.map((r) => ({ x: r.year, y: r.real }))], dashed: true }] : [])]} />
          <DataTable headers={['Year', 'Start', 'Growth', 'You spend', 'End', "Today's $"]} rows={rows.map((r) => [r.year, money(r.start), money(r.growth), money(r.withdrawal), money(r.end), money(r.real)])} />
          <Note>Reality is bumpier: stocks do not return the same amount every year. A crash in the first years of retirement hurts more than one late (sequence risk). That is why the rule of thumb is a modest percentage and not the most you can squeeze out.</Note>
        </>
      }
    />
  );
};
