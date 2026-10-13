import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Choice, Toggle, Stat, Stats, MathBlock, DataTable, Note } from './ui';
import { BarList } from './charts';
import { incomeTax, Status, FED_STD_DEDUCTION, CA_STD_DEDUCTION } from './lib/tax';
import { money, pct } from './lib/fmt';

interface Props {
  income?: number;
  status?: Status;
  state?: boolean;
}

// Marginal vs effective tax, bracket by bracket, federal and California, 2026.
export const TaxBrackets: React.FC<Props> = ({ income: i0 = 100000, status: s0 = 'single', state: st0 = true }) => {
  const [income, setIncome] = useState(i0);
  const [status, setStatus] = useState<Status>(s0);
  const [pretax, setPretax] = useState(0);
  const [kids, setKids] = useState(0);
  const [withState, setWithState] = useState(st0);

  const t = useMemo(() => incomeTax({ status, fedIncome: Math.max(0, income - pretax), caIncome: Math.max(0, income - pretax), kids }), [income, status, pretax, kids]);
  const more = useMemo(() => incomeTax({ status, fedIncome: Math.max(0, income - pretax) + 1000, caIncome: Math.max(0, income - pretax) + 1000, kids }), [income, status, pretax, kids]);
  const fedTotal = t.federal;
  const caTotal = withState ? t.ca : 0;
  const total = fedTotal + caTotal;
  const extra = more.federal - t.federal + (withState ? more.ca - t.ca : 0);

  return (
    <CalcFrame
      title="Tax brackets: who pays what on each dollar"
      subtitle="2026 federal and California. Change the income, status and deductions."
      presets={[
        { label: '$100,000 single', apply: () => { setIncome(100000); setStatus('single'); setPretax(0); setKids(0); } },
        { label: '$100,000 married', apply: () => { setIncome(100000); setStatus('married'); } },
        { label: '$60,000', apply: () => setIncome(60000) },
        { label: '$250,000', apply: () => setIncome(250000) },
        { label: '$100,000 with $24,500 pre-tax 401k', apply: () => setPretax(24500) },
        { label: 'Two kids', apply: () => setKids(2) },
      ]}
      inputs={
        <>
          <NumField label="Income (wages)" value={income} onChange={setIncome} prefix="$" min={0} step={1000} slider max={400000} />
          <Choice label="Filing status" value={status} onChange={setStatus} options={[{ value: 'single', label: 'Single' }, { value: 'married', label: 'Married, filing jointly' }]} />
          <NumField label="Pre-tax deductions (traditional 401k, HSA, premiums)" value={pretax} onChange={setPretax} prefix="$" min={0} step={500} help="lowers taxable income" />
          <NumField label="Children under 17" value={kids} onChange={(n) => setKids(Math.round(n))} min={0} max={6} help="$2,200 federal credit each" />
          <Toggle label="Include California" checked={withState} onChange={setWithState} />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="Federal tax" value={money(fedTotal)} sub={`marginal bracket ${t.federalMarginal}%`} />
            {withState && <Stat label="California tax" value={money(caTotal)} sub={`marginal bracket ${t.caMarginal}%`} />}
            <Stat label="Total income tax" value={money(total)} tone="bad" />
            <Stat label="Effective rate" value={pct(income ? (total / income) * 100 : 0)} sub="the true average" tone="good" />
            <Stat label="Next $1,000 you earn" value={`${money(extra)} in tax`} sub={`${pct(extra / 10)} marginal`} />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Income after pre-tax deductions', formula: `${money(income)} - ${money(pretax)}`, value: money(Math.max(0, income - pretax)) },
              { label: 'Federal standard deduction', formula: status === 'single' ? 'single' : 'married', value: `-${money(FED_STD_DEDUCTION[status])}` },
              { label: 'Federal taxable income', value: money(t.taxableFed), strong: true },
              ...(kids > 0 ? [{ label: 'Child tax credit', formula: `${kids} x $2,200 (cannot exceed the tax)`, value: `-${money(t.childCredit)}` }] : []),
              ...(withState
                ? [
                    { label: 'California standard deduction', value: `-${money(CA_STD_DEDUCTION[status])}` },
                    { label: 'California taxable income', value: money(t.taxableCA), strong: true },
                    { label: 'California exemption credits', formula: 'personal credit plus $491 per child', value: `-${money(t.caCredits)}` },
                  ]
                : []),
            ]}
          />
        </>
      }
      below={
        <>
          <BarList title="Federal tax in each bracket" format={money} rows={t.federalSlices.filter((s) => s.amountInBracket > 0).map((s) => ({ label: `${s.rate}% bracket (to ${s.to === Infinity ? 'and up' : money(s.to)})`, value: s.tax, note: `${money(s.amountInBracket)} taxed at ${s.rate}% = ${money(s.tax)}` }))} />
          {withState && (
            <BarList title="California tax in each bracket (before credits)" format={money} rows={t.caSlices.filter((s) => s.amountInBracket > 0).map((s) => ({ label: `${s.rate}% bracket`, value: s.tax, note: `${money(s.amountInBracket)} x ${s.rate}% = ${money(s.tax)}` }))} />
          )}
          <DataTable headers={['Federal bracket', 'Rate', 'Income in it', 'Tax']} rows={t.federalSlices.map((s) => [s.to === Infinity ? 'over the last' : `up to ${money(s.to)}`, `${s.rate}%`, money(s.amountInBracket), money(s.tax)])} maxHeight={260} />
          <Note>Federal: IRS Rev. Proc. 2025-32. California: FTB 2026 indexed amounts. Does not include Social Security, Medicare or SDI (that is the paycheck topic).</Note>
        </>
      }
    />
  );
};
