import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Choice, Stat, Stats, MathBlock, DataTable, Note } from './ui';
import { LineChart } from './charts';
import { compound, realRate, yearsToDouble } from './lib/compound';
import { money, moneyShort, pct } from './lib/fmt';

interface Props {
  start?: number;
  yearly?: number;
  rate?: number;
  years?: number;
  inflation?: number;
  showInflation?: boolean;
  timing?: 'end' | 'begin';
  presets?: { label: string; start: number; yearly: number; rate: number; years: number }[];
  title?: string;
}

// Change the balance, the yearly deposit, the rate and the years. See every year and the math.
export const CompoundCalculator: React.FC<Props> = ({
  start: s0 = 10000,
  yearly: y0 = 0,
  rate: r0 = 10,
  years: n0 = 10,
  inflation: i0 = 3,
  showInflation = false,
  timing: t0 = 'end',
  presets,
  title = 'Compound growth calculator',
}) => {
  const [start, setStart] = useState(s0);
  const [yearly, setYearly] = useState(y0);
  const [rate, setRate] = useState(r0);
  const [years, setYears] = useState(n0);
  const [inflation, setInflation] = useState(i0);
  const [timing, setTiming] = useState<'end' | 'begin'>(t0);
  const [real, setReal] = useState(showInflation);

  const rows = useMemo(
    () => compound({ start, yearly, rate, years: Math.max(1, Math.min(60, Math.round(years))), inflation: real ? inflation : 0, timing }),
    [start, yearly, rate, years, inflation, timing, real]
  );
  const last = rows[rows.length - 1];
  const first = rows[0];
  const growthTotal = last.end - last.contributed;
  const flat = Array.from({ length: rows.length }, (_, i) => start + yearly * (i + 1));

  const defaults = presets ?? [
    { label: '$10,000 once, 10% for 10 years', start: 10000, yearly: 0, rate: 10, years: 10 },
    { label: '$10,000 every year, 10%', start: 0, yearly: 10000, rate: 10, years: 10 },
    { label: '$500 a month from age 25 to 65', start: 0, yearly: 6000, rate: 10.5, years: 40 },
    { label: 'Same, but wait until 35', start: 0, yearly: 6000, rate: 10.5, years: 30 },
    { label: 'Bank savings at 1%', start: 10000, yearly: 0, rate: 1, years: 30 },
  ];

  return (
    <CalcFrame
      title={title}
      subtitle="Change any number and watch every year update."
      presets={defaults.map((p) => ({
        label: p.label,
        apply: () => {
          setStart(p.start);
          setYearly(p.yearly);
          setRate(p.rate);
          setYears(p.years);
        },
      }))}
      inputs={
        <>
          <NumField label="Starting balance" value={start} onChange={setStart} prefix="$" min={0} step={1000} slider max={500000} />
          <NumField label="Add every year" value={yearly} onChange={setYearly} prefix="$" min={0} step={500} slider max={50000} help={yearly > 0 ? `${money(yearly / 12)} a month` : undefined} />
          <NumField label="Yearly return" value={rate} onChange={setRate} suffix="%" min={0} max={30} step={0.5} slider />
          <NumField label="Years" value={years} onChange={setYears} suffix="years" min={1} max={60} slider />
          <Choice
            label="When does each deposit land?"
            value={timing}
            onChange={setTiming}
            options={[
              { value: 'end', label: 'End of year' },
              { value: 'begin', label: 'Start of year' },
            ]}
          />
          <Choice
            label="Show inflation"
            value={real ? 'on' : 'off'}
            onChange={(v) => setReal(v === 'on')}
            options={[
              { value: 'off', label: 'Off' },
              { value: 'on', label: 'On' },
            ]}
          />
          {real && <NumField label="Inflation per year" value={inflation} onChange={setInflation} suffix="%" min={0} max={15} step={0.25} slider />}
        </>
      }
      results={
        <>
          <Stats>
            <Stat label={`Balance after ${rows.length} years`} value={money(last.end)} tone="good" />
            <Stat label="You put in" value={money(last.contributed)} sub={`${pct((last.contributed / Math.max(1, last.end)) * 100, 0)} of the total`} />
            <Stat label="Growth did the rest" value={money(growthTotal)} sub={`${pct((growthTotal / Math.max(1, last.end)) * 100, 0)} of the total`} />
            {real ? (
              <Stat label="In today's dollars" value={money(last.real)} sub={`real return about ${pct(realRate(rate, inflation), 2)}`} tone="bad" />
            ) : (
              <Stat label="Doubles about every" value={`${yearsToDouble(rate).toFixed(1)} years`} sub={rate > 0 ? `rule of 72: ${(72 / rate).toFixed(1)} years` : undefined} />
            )}
          </Stats>
          <MathBlock
            lines={[
              { label: 'Year 1 growth', formula: timing === 'begin' ? `(${money(first.start)} + ${money(first.contribution)}) x ${rate}%` : `${money(first.start)} x ${rate}%`, value: money(first.growth) },
              { label: 'Year 1 ends at', formula: `${money(first.start)} + ${money(first.contribution)} + ${money(first.growth)}`, value: money(first.end), strong: true },
              { label: 'Each year after', formula: 'new balance = old balance x (1 + rate) + deposit', value: '' },
              { label: `Year ${rows.length} growth alone`, formula: timing === 'begin' ? `(${money(last.start)} + ${money(last.contribution)}) x ${rate}%` : `${money(last.start)} x ${rate}%`, value: money(last.growth), indent: true },
              { label: 'Total you deposited', formula: `${money(start)} + ${rows.length} x ${money(yearly)}`, value: money(last.contributed) },
              ...(real ? [{ label: "Today's-dollar value", formula: `${money(last.end)} / (1 + ${inflation}%)^${rows.length}`, value: money(last.real), strong: true }] : []),
            ]}
          />
        </>
      }
      below={
        <>
          <LineChart
            title="Balance over time"
            format={moneyShort}
            series={[
              { name: 'Balance', points: rows.map((r) => ({ x: r.year, y: r.end })) },
              ...(real ? [{ name: "In today's dollars", points: rows.map((r) => ({ x: r.year, y: r.real })), dashed: true }] : []),
              { name: 'Only what you put in', points: rows.map((r, i) => ({ x: r.year, y: flat[i] })), color: '#475569' },
            ]}
          />
          <DataTable
            headers={['Year', 'Start', 'Deposit', 'Growth', 'End', ...(real ? ["Today's $"] : [])]}
            rows={rows.map((r) => [r.year, money(r.start), money(r.contribution), money(r.growth), money(r.end), ...(real ? [money(r.real)] : [])])}
          />
          <Note>Annual compounding. Real returns vary every year. This shows an average, which no real year ever matches.</Note>
        </>
      }
    />
  );
};
