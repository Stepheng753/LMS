import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, MathBlock, DataTable, Note } from './ui';
import { LineChart } from './charts';
import { rothVsTraditional, sameLimitComparison } from './lib/roth';
import { money, moneyShort } from './lib/fmt';

interface Props {
  taxNow?: number;
  taxLater?: number;
}

export const RothVsTraditional: React.FC<Props> = ({ taxNow: n0 = 22, taxLater: l0 = 22 }) => {
  const [yearly, setYearly] = useState(10000);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(8);
  const [taxNow, setTaxNow] = useState(n0);
  const [taxLater, setTaxLater] = useState(l0);

  const r = useMemo(() => rothVsTraditional({ yearlyPreTax: yearly, years: Math.max(1, Math.round(years)), rate, taxNow, taxLater }), [yearly, years, rate, taxNow, taxLater]);
  const series = useMemo(() => {
    const out: { x: number; t: number; ro: number }[] = [];
    for (let y = 1; y <= Math.round(years); y++) {
      const x = rothVsTraditional({ yearlyPreTax: yearly, years: y, rate, taxNow, taxLater });
      out.push({ x: y, t: x.traditional, ro: x.roth });
    }
    return out;
  }, [yearly, years, rate, taxNow, taxLater]);
  const lim = sameLimitComparison(24500, Math.round(years), rate, taxLater);
  const winner = Math.abs(r.difference) < 1 ? 'tie' : r.difference > 0 ? 'Roth' : 'Traditional';

  return (
    <CalcFrame
      title="Roth vs Traditional"
      subtitle="Same pay set aside, same investment. Only the timing of the tax changes."
      presets={[
        { label: 'Same rate both times', apply: () => { setTaxNow(22); setTaxLater(22); } },
        { label: 'Lower rate in retirement (22% then 12%)', apply: () => { setTaxNow(22); setTaxLater(12); } },
        { label: 'Higher rate in retirement (12% then 24%)', apply: () => { setTaxNow(12); setTaxLater(24); } },
        { label: 'Young and in a low bracket', apply: () => { setTaxNow(12); setTaxLater(22); setYears(40); } },
        { label: 'Peak earner, 35%', apply: () => { setTaxNow(35); setTaxLater(22); } },
      ]}
      inputs={
        <>
          <NumField label="Pay you set aside each year (before tax)" value={yearly} onChange={setYearly} prefix="$" min={0} step={500} slider max={50000} help={`${money(yearly / 12)} a month`} />
          <NumField label="Years until you withdraw" value={years} onChange={setYears} suffix="years" min={1} max={50} slider />
          <NumField label="Yearly return" value={rate} onChange={setRate} suffix="%" min={0} max={20} step={0.5} slider />
          <NumField label="Your tax rate now (federal + state, top bracket)" value={taxNow} onChange={setTaxNow} suffix="%" min={0} max={50} step={1} slider />
          <NumField label="Your tax rate when you withdraw" value={taxLater} onChange={setTaxLater} suffix="%" min={0} max={50} step={1} slider />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="Traditional, after tax" value={money(r.traditional)} sub={`${money(r.traditionalBeforeTax)} before tax`} />
            <Stat label="Roth, after tax" value={money(r.roth)} sub="nothing owed on withdrawal" />
            <Stat label="Difference" value={winner === 'tie' ? 'None' : `${winner} by ${money(Math.abs(r.difference))}`} tone={winner === 'tie' ? 'normal' : winner === 'Roth' ? 'good' : 'bad'} sub={winner === 'tie' ? 'equal rates give equal results' : ''} />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Traditional: invest it all, tax at the end', formula: `${money(yearly)}/yr grows to ${money(r.traditionalBeforeTax)}`, value: money(r.traditionalBeforeTax) },
              { label: 'Tax when you withdraw', formula: `${money(r.traditionalBeforeTax)} x ${taxLater}%`, value: `-${money(r.taxPaidLaterTrad)}`, indent: true },
              { label: 'Traditional you keep', value: money(r.traditional), strong: true },
              { label: 'Roth: pay tax first', formula: `${money(yearly)} x (1 - ${taxNow}%) = ${money(r.rothInvestedYearly)} a year`, value: `-${money(yearly - r.rothInvestedYearly)}/yr` },
              { label: 'Roth grows tax-free', formula: `${money(r.rothInvestedYearly)}/yr for ${Math.round(years)} years`, value: money(r.roth), strong: true },
            ]}
          />
        </>
      }
      below={
        <>
          <LineChart title="Value after tax, by year" format={moneyShort} series={[{ name: 'Traditional (after tax)', points: series.map((s) => ({ x: s.x, y: s.t })) }, { name: 'Roth', points: series.map((s) => ({ x: s.x, y: s.ro })), dashed: true }]} />
          <DataTable
            headers={['Same 401k limit ($24,500 a year)', 'Value after tax']}
            rows={[
              ['Traditional: you fill the limit, then owe tax', money(lim.traditionalAfterTax)],
              ['Roth: you fill the limit, nothing is owed', money(lim.rothAfterTax)],
              ['Roth advantage from a bigger account in real terms', money(lim.rothAfterTax - lim.traditionalAfterTax)],
            ]}
            maxHeight={200}
          />
          <Note>The second table is the hidden Roth edge: both accounts have the same $24,500 cap, but the Roth cap is after-tax dollars, so it holds more real money. Marginal rates are the top bracket you are in, not your average.</Note>
        </>
      }
    />
  );
};
