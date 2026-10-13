import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, DataTable, Note } from './ui';
import { LineChart } from './charts';
import { compound } from './lib/compound';
import { money, moneyShort } from './lib/fmt';

// The same money at several rates, side by side.
export const RateCompare: React.FC = () => {
  const [start, setStart] = useState(10000);
  const [yearly, setYearly] = useState(6000);
  const [years, setYears] = useState(40);
  const [a, setA] = useState(1);
  const [b, setB] = useState(5);
  const [c, setC] = useState(7);
  const [d, setD] = useState(10.5);

  const rates = [a, b, c, d];
  const sims = useMemo(() => rates.map((r) => compound({ start, yearly, rate: r, years: Math.max(1, Math.min(60, Math.round(years))) })), [start, yearly, years, a, b, c, d]); // eslint-disable-line react-hooks/exhaustive-deps
  const n = sims[0].length;
  const checkpoints = [1, 5, 10, 20, 30, 40, 50, 60].filter((y) => y <= n);

  return (
    <CalcFrame
      title="Same money, different rates"
      subtitle="Only the rate changes. Look at how far apart the lines end up."
      presets={[
        { label: 'Bank vs bonds vs stocks', apply: () => { setA(1); setB(4.5); setC(7); setD(10.5); } },
        { label: 'Small gaps: 8, 9, 10, 11', apply: () => { setA(8); setB(9); setC(10); setD(11); } },
        { label: 'Just one lump sum', apply: () => { setStart(10000); setYearly(0); } },
      ]}
      inputs={
        <>
          <NumField label="Starting balance" value={start} onChange={setStart} prefix="$" min={0} step={1000} />
          <NumField label="Add every year" value={yearly} onChange={setYearly} prefix="$" min={0} step={500} />
          <NumField label="Years" value={years} onChange={setYears} suffix="years" min={1} max={60} slider />
          <div className="grid grid-cols-2 gap-3">
            <NumField label="Rate A" value={a} onChange={setA} suffix="%" min={0} max={30} step={0.5} />
            <NumField label="Rate B" value={b} onChange={setB} suffix="%" min={0} max={30} step={0.5} />
            <NumField label="Rate C" value={c} onChange={setC} suffix="%" min={0} max={30} step={0.5} />
            <NumField label="Rate D" value={d} onChange={setD} suffix="%" min={0} max={30} step={0.5} />
          </div>
        </>
      }
      results={
        <Stats>
          {rates.map((r, i) => (
            <Stat key={i} label={`${r}% for ${n} years`} value={money(sims[i][n - 1].end)} sub={`growth ${money(sims[i][n - 1].end - sims[i][n - 1].contributed)}`} tone={i === 3 ? 'good' : 'normal'} />
          ))}
        </Stats>
      }
      below={
        <>
          <LineChart title="All four rates" format={moneyShort} series={rates.map((r, i) => ({ name: `${r}%`, points: sims[i].map((row) => ({ x: row.year, y: row.end })) }))} />
          <DataTable headers={['Year', ...rates.map((r) => `${r}%`)]} rows={checkpoints.map((y) => [y, ...sims.map((s) => money(s[y - 1].end))])} />
          <Note>The gap between rates grows every year, because each year the higher rate earns on a bigger pile.</Note>
        </>
      }
    />
  );
};
