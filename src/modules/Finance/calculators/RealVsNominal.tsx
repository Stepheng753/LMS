import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, MathBlock, DataTable, Note } from './ui';
import { LineChart } from './charts';
import { compound, realRate } from './lib/compound';
import { money, moneyShort, pct } from './lib/fmt';

// Future value vs purchasing power.
export const RealVsNominal: React.FC = () => {
  const [start, setStart] = useState(10000);
  const [yearly, setYearly] = useState(6000);
  const [rate, setRate] = useState(10.5);
  const [inflation, setInflation] = useState(3);
  const [years, setYears] = useState(40);

  const rows = useMemo(() => compound({ start, yearly, rate, years: Math.max(1, Math.min(60, Math.round(years))), inflation }), [start, yearly, rate, inflation, years]);
  const last = rows[rows.length - 1];
  const lost = last.end - last.real;
  const price = Math.pow(1 + inflation / 100, rows.length);

  return (
    <CalcFrame
      title="Future value vs what it can buy"
      subtitle="The big number is real money. It is just not worth what it is worth today."
      presets={[
        { label: 'S&P 500: 10.5% vs 3%', apply: () => { setRate(10.5); setInflation(3); } },
        { label: 'High inflation: 6%', apply: () => { setInflation(6); } },
        { label: 'Savings account: 1% vs 3%', apply: () => { setRate(1); setInflation(3); } },
        { label: 'Zero inflation', apply: () => { setInflation(0); } },
      ]}
      inputs={
        <>
          <NumField label="Starting balance" value={start} onChange={setStart} prefix="$" min={0} step={1000} />
          <NumField label="Add every year" value={yearly} onChange={setYearly} prefix="$" min={0} step={500} help={`${money(yearly / 12)} a month`} />
          <NumField label="Investment return" value={rate} onChange={setRate} suffix="%" min={0} max={30} step={0.5} slider />
          <NumField label="Inflation" value={inflation} onChange={setInflation} suffix="%" min={0} max={15} step={0.25} slider />
          <NumField label="Years" value={years} onChange={setYears} suffix="years" min={1} max={60} slider />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label={`Dollars in ${rows.length} years`} value={money(last.end)} sub="the number on your statement" />
            <Stat label="Buying power in today's dollars" value={money(last.real)} tone="bad" sub="what it can actually buy" />
            <Stat label="Prices will be" value={`${price.toFixed(2)}x`} sub={`a $100 item costs ${money(100 * price)}`} />
            <Stat label="Real return per year" value={pct(realRate(rate, inflation), 2)} tone="good" sub="return after inflation" />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Real return', formula: `(1 + ${rate}%) / (1 + ${inflation}%) - 1`, value: pct(realRate(rate, inflation), 2), strong: true },
              { label: 'Prices multiply by', formula: `(1 + ${inflation}%)^${rows.length}`, value: `${price.toFixed(2)}x` },
              { label: "Today's-dollar value", formula: `${money(last.end)} / ${price.toFixed(2)}`, value: money(last.real), strong: true },
              { label: 'Lost to inflation', formula: `${money(last.end)} - ${money(last.real)}`, value: money(lost) },
            ]}
          />
        </>
      }
      below={
        <>
          <LineChart
            title="Statement balance vs purchasing power"
            format={moneyShort}
            series={[
              { name: 'Dollars on the statement', points: rows.map((r) => ({ x: r.year, y: r.end })) },
              { name: "In today's dollars", points: rows.map((r) => ({ x: r.year, y: r.real })), dashed: true },
              { name: 'Only what you put in', points: rows.map((r) => ({ x: r.year, y: r.contributed })), color: '#475569' },
            ]}
          />
          <DataTable headers={['Year', 'Statement', "Today's $", 'Price of a $100 item']} rows={rows.filter((r) => r.year % 5 === 0 || r.year === 1).map((r) => [r.year, money(r.end), money(r.real), money(100 * Math.pow(1 + inflation / 100, r.year))])} />
          <Note>Inflation: Bureau of Labor Statistics CPI, about 3% a year on average since 1928. Stock returns: NYU Stern (Damodaran) historical returns dataset.</Note>
        </>
      }
    />
  );
};
