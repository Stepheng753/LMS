import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Choice, Toggle, Stat, Stats, MathBlock, Note } from './ui';
import { StackedBar } from './charts';
import { selfEmployment, fica, incomeTax, Status } from './lib/tax';
import { money, pct } from './lib/fmt';

// W-2 shares the payroll tax with the employer. 1099 pays both halves.
export const SelfEmploymentTax: React.FC = () => {
  const [revenue, setRevenue] = useState(100000);
  const [expenses, setExpenses] = useState(10000);
  const [status, setStatus] = useState<Status>('single');
  const [qbi, setQbi] = useState(false);

  const se = useMemo(() => selfEmployment({ revenue, expenses, status, qbi }), [revenue, expenses, status, qbi]);
  // The same dollars as a W-2 salary: the employee pays 7.65%, the employer pays another 7.65%.
  const w2Fica = fica(se.netProfit, status);
  const w2Tax = incomeTax({ status, fedIncome: se.netProfit, caIncome: se.netProfit });
  const w2Total = w2Fica.total + w2Tax.federal + w2Tax.ca;
  const employerShare = w2Fica.socialSecurity + w2Fica.medicare;

  return (
    <CalcFrame
      title="W-2 vs 1099: the same income, a different tax bill"
      subtitle="On a W-2 your employer pays half of Social Security and Medicare. On a 1099 you pay both halves."
      presets={[
        { label: '$100,000, no expenses', apply: () => { setRevenue(100000); setExpenses(0); } },
        { label: '$40,000 side income', apply: () => { setRevenue(40000); setExpenses(4000); } },
        { label: '$150,000 married', apply: () => { setRevenue(150000); setExpenses(15000); setStatus('married'); } },
        { label: 'With 20% QBI deduction', apply: () => setQbi(true) },
      ]}
      inputs={
        <>
          <NumField label="What you earned (1099 revenue)" value={revenue} onChange={setRevenue} prefix="$" min={0} step={1000} slider max={300000} />
          <NumField label="Business expenses you can deduct" value={expenses} onChange={setExpenses} prefix="$" min={0} step={500} help="software, supplies, mileage, part of rent" />
          <Choice label="Filing status" value={status} onChange={setStatus} options={[{ value: 'single', label: 'Single' }, { value: 'married', label: 'Married, jointly' }]} />
          <Toggle label="Apply the 20% qualified business income deduction" checked={qbi} onChange={setQbi} help="available to many sole proprietors; talk to a tax pro" />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="1099 total tax" value={money(se.total)} tone="bad" sub={`${pct((se.total / Math.max(1, se.netProfit)) * 100)} of net profit`} />
            <Stat label="Same $ as W-2 wages" value={money(w2Total)} tone="good" sub="your share only" />
            <Stat label="You pay extra as 1099" value={money(se.total - w2Total)} sub={`includes the employer half: ${money(employerShare)}`} />
            <Stat label="Set aside each quarter" value={money(se.quarterly)} sub="estimated payments: Apr, Jun, Sep, Jan" />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Net profit', formula: `${money(revenue)} - ${money(expenses)}`, value: money(se.netProfit) },
              { label: 'Self-employment base', formula: 'net profit x 92.35%', value: money(se.seBase) },
              { label: 'Social Security (both halves)', formula: `${money(se.seBase)} x 12.4%`, value: money(se.socialSecurity), indent: true },
              { label: 'Medicare (both halves)', formula: `${money(se.seBase)} x 2.9%`, value: money(se.medicare), indent: true },
              { label: 'Self-employment tax', value: money(se.seTax), strong: true },
              { label: 'Half of it is deductible', value: `-${money(se.halfSeDeduction)}` },
              ...(qbi ? [{ label: '20% QBI deduction', value: `-${money(se.qbiDeduction)}` }] : []),
              { label: 'Federal income tax', formula: `on ${money(se.taxableFed)} taxable`, value: money(se.federal) },
              { label: 'California income tax', formula: `on ${money(se.taxableCA)} taxable`, value: money(se.ca) },
            ]}
          />
        </>
      }
      below={
        <>
          <StackedBar
            title="Where your 1099 profit goes in tax"
            format={money}
            parts={[
              { label: 'Social Security', value: se.socialSecurity, color: '#475569' },
              { label: 'Medicare', value: se.medicare, color: '#b45309' },
              { label: 'Federal income tax', value: se.federal, color: 'var(--primary)' },
              { label: 'California income tax', value: se.ca, color: '#6d28d9' },
              { label: 'You keep', value: Math.max(0, se.netProfit - se.total), color: '#0f766e' },
            ]}
          />
          <Note>The 1099 person also buys their own health insurance and has no employer 401k match, so the real gap is larger than the tax gap. The upside: business expense deductions, and more control. Simplified. No SDI on 1099 income unless you opt in.</Note>
        </>
      }
    />
  );
};
