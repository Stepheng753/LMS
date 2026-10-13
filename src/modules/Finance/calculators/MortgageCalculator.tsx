import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, MathBlock, DataTable, Note, GroupLabel } from './ui';
import { LineChart, StackedBar } from './charts';
import { computeMortgage, DEFAULT_MORTGAGE, MortgageInput } from './lib/mortgage';
import { money, moneyShort, pct } from './lib/fmt';

interface Props {
  initial?: Partial<MortgageInput>;
  /** 'full' shows everything. 'payment' hides the long-run tables. */
  mode?: 'full' | 'payment' | 'value';
  title?: string;
}

export const MortgageCalculator: React.FC<Props> = ({ initial, mode = 'full', title = 'Mortgage and home cost calculator' }) => {
  const [m, setM] = useState<MortgageInput>({ ...DEFAULT_MORTGAGE, ...initial });
  const set = (patch: Partial<MortgageInput>) => setM((x) => ({ ...x, ...patch }));
  const r = useMemo(() => computeMortgage(m, [1, 2, 5, 10, 15, 20, 25, 30]), [m]);

  const yearly = useMemo(() => {
    const out: { year: number; balance: number; value: number }[] = [];
    for (let y = 0; y <= m.years; y++) {
      out.push({ year: y, balance: y === 0 ? r.loan : r.schedule[y * 12 - 1].balance, value: m.price * Math.pow(1 + m.appreciation / 100, y) });
    }
    return out;
  }, [m, r]);

  const interestShare = r.schedule.length ? (r.schedule.slice(0, 12).reduce((s, x) => s + x.interest, 0) / (r.payment * 12)) * 100 : 0;

  return (
    <CalcFrame
      title={title}
      subtitle="Defaults: a $500,000 condo in San Diego, 20% down. Change anything."
      presets={[
        { label: '$500k condo, 20% down', apply: () => setM({ ...DEFAULT_MORTGAGE }) },
        { label: '5% down (PMI)', apply: () => set({ downPct: 5 }) },
        { label: '3.5% down (FHA-style)', apply: () => set({ downPct: 3.5 }) },
        { label: '15-year loan', apply: () => set({ years: 15 }) },
        { label: 'Rate 5.5%', apply: () => set({ rate: 5.5 }) },
        { label: 'Rate 7.5%', apply: () => set({ rate: 7.5 }) },
        { label: '$900k house, 20% down', apply: () => setM({ ...DEFAULT_MORTGAGE, price: 900000, hoaMonth: 0, insuranceYear: 1800, maintenancePct: 1 }) },
        { label: 'Home values flat (0%)', apply: () => set({ appreciation: 0 }) },
        { label: 'Home values +6%', apply: () => set({ appreciation: 6 }) },
      ]}
      inputs={
        <>
          <GroupLabel>The loan</GroupLabel>
          <NumField label="Price" value={m.price} onChange={(n) => set({ price: n })} prefix="$" min={0} step={10000} slider max={2000000} />
          <NumField label="Down payment" value={m.downPct} onChange={(n) => set({ downPct: n })} suffix="%" min={0} max={100} step={0.5} slider help={money((m.price * m.downPct) / 100)} />
          <NumField label="Interest rate (APR)" value={m.rate} onChange={(n) => set({ rate: n })} suffix="%" min={0} max={15} step={0.125} slider />
          <NumField label="Loan term" value={m.years} onChange={(n) => set({ years: Math.max(5, Math.min(30, Math.round(n))) })} suffix="years" min={5} max={30} />
          <GroupLabel>Costs of owning</GroupLabel>
          <NumField label="Property tax" value={m.propertyTaxPct} onChange={(n) => set({ propertyTaxPct: n })} suffix="% of assessed value" min={0} max={3} step={0.05} help="San Diego about 1.1 to 1.25%" />
          <NumField label="Insurance (condo HO-6 or home)" value={m.insuranceYear} onChange={(n) => set({ insuranceYear: n })} prefix="$" suffix="/yr" min={0} step={100} />
          <NumField label="HOA dues" value={m.hoaMonth} onChange={(n) => set({ hoaMonth: n })} prefix="$" suffix="/mo" min={0} step={25} />
          <NumField label="Maintenance" value={m.maintenancePct} onChange={(n) => set({ maintenancePct: n })} suffix="% of value / yr" min={0} max={4} step={0.25} />
          <NumField label="PMI (if under 20% down)" value={m.pmiPct} onChange={(n) => set({ pmiPct: n })} suffix="% of loan / yr" min={0} max={2} step={0.1} />
          <NumField label="Closing costs" value={m.closingPct} onChange={(n) => set({ closingPct: n })} suffix="% of price" min={0} max={6} step={0.25} />
          <GroupLabel>The future</GroupLabel>
          <NumField label="Home value growth per year" value={m.appreciation} onChange={(n) => set({ appreciation: n })} suffix="%" min={-5} max={12} step={0.5} slider help="long-run US average about 4%" />
          <NumField label="Tax assessment growth (Prop 13 cap 2%)" value={m.assessedGrowth} onChange={(n) => set({ assessedGrowth: Math.min(2, n) })} suffix="%" min={0} max={2} step={0.25} />
          <NumField label="Cost to sell" value={m.sellingPct} onChange={(n) => set({ sellingPct: n })} suffix="% of value" min={0} max={10} step={0.5} />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="Mortgage payment (principal + interest)" value={money(r.payment)} tone="good" sub={`loan ${money(r.loan)}`} />
            <Stat label="All-in per month, year 1" value={money(r.allInMonthly)} tone="bad" sub="payment + tax + insurance + HOA + upkeep" />
            <Stat label="Cash needed up front" value={money(r.down + r.closing)} sub={`${money(r.down)} down + ${money(r.closing)} closing`} />
            <Stat label="Interest over the full loan" value={money(r.totalInterest30)} sub={`${pct((r.totalInterest30 / r.loan) * 100, 0)} of the loan`} />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Loan', formula: `${money(m.price)} - ${money(r.down)} down`, value: money(r.loan) },
              { label: 'Monthly payment', formula: 'loan x r / (1 - (1 + r)^-n), r = rate/12, n = months', value: money(r.payment), strong: true },
              { label: 'Property tax / month', formula: `${money(m.price)} x ${m.propertyTaxPct}% / 12`, value: money(r.taxMonthly) },
              { label: 'Insurance + HOA + upkeep / month', formula: `${money(r.insuranceMonthly)} + ${money(r.hoaMonthly)} + ${money(r.maintMonthly)}`, value: money(r.insuranceMonthly + r.hoaMonthly + r.maintMonthly) },
              { label: 'PMI / month', formula: m.downPct < 20 ? `${money(r.loan)} x ${m.pmiPct}% / 12` : 'none: 20% or more down', value: money(r.pmiMonthly) },
              { label: 'Month 1 of the loan', formula: `interest ${money(r.schedule[0].interest)}, principal ${money(r.schedule[0].principal)}`, value: `${pct(interestShare, 0)} interest` },
              ...(r.pmiEndsMonth ? [{ label: 'PMI ends', formula: 'when the loan is 80% of the price', value: `month ${r.pmiEndsMonth}` }] : []),
            ]}
          />
        </>
      }
      below={
        <>
          <StackedBar
            title="Where one month of owning goes"
            format={money}
            parts={[
              { label: 'Interest (month 1)', value: r.schedule[0].interest, color: '#b91c1c' },
              { label: 'Principal (month 1)', value: r.schedule[0].principal, color: '#0f766e' },
              { label: 'Property tax', value: r.taxMonthly, color: '#b45309' },
              { label: 'Insurance', value: r.insuranceMonthly, color: '#6d28d9' },
              { label: 'HOA', value: r.hoaMonthly, color: '#475569' },
              { label: 'Maintenance', value: r.maintMonthly, color: '#be185d' },
              { label: 'PMI', value: r.pmiMonthly, color: '#2563eb' },
            ]}
          />
          {mode !== 'payment' && (
            <>
              <DataTable
                headers={['After', 'Home value', 'Loan left', 'Equity', 'Total you paid out', 'Money gone (not equity)', 'If you sold']}
                rows={r.milestones.map((x) => [`${x.year} yr`, money(x.homeValue), money(x.loanBalance), money(x.equity), money(x.totalPaid), money(x.goneMoney), money(x.netIfSold)])}
                maxHeight={360}
              />
              <LineChart
                title="Home value vs what you still owe"
                format={moneyShort}
                series={[
                  { name: 'Home value', points: yearly.map((y) => ({ x: y.year, y: y.value })) },
                  { name: 'Loan left', points: yearly.map((y) => ({ x: y.year, y: y.balance })), color: '#b91c1c' },
                  { name: 'Equity', points: yearly.map((y) => ({ x: y.year, y: y.value - y.balance })), color: '#0f766e', dashed: true },
                ]}
              />
              <DataTable
                headers={['Year', 'Interest paid', 'Principal paid', 'Balance']}
                rows={Array.from({ length: m.years }, (_, i) => {
                  const rows = r.schedule.slice(i * 12, i * 12 + 12);
                  return [i + 1, money(rows.reduce((s, x) => s + x.interest, 0)), money(rows.reduce((s, x) => s + x.principal, 0)), money(rows[rows.length - 1].balance)];
                })}
                maxHeight={300}
              />
            </>
          )}
          <Note>Costs after year 1 assume insurance and HOA rise 3% a year, property tax follows the assessment (Prop 13 limits it to +2% a year), and upkeep follows the home value. &quot;Total you paid out&quot; includes the down payment, closing costs, principal, interest and every other cost. &quot;Money gone&quot; is interest, tax, PMI, upkeep and closing: the part that is not equity.</Note>
        </>
      }
    />
  );
};
