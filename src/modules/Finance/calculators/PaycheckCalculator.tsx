import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Choice, Stat, Stats, MathBlock, DataTable, Note, GroupLabel } from './ui';
import { StackedBar } from './charts';
import { computePaycheck, DEFAULT_PAYCHECK, PaycheckInput, LIMIT_401K, LIMIT_FSA, LIMIT_HSA_FAMILY, LIMIT_HSA_SELF } from './lib/paycheck';
import { SS_WAGE_BASE } from './lib/tax';
import { money, pct } from './lib/fmt';

interface Props {
  initial?: Partial<PaycheckInput>;
  /** Show the table that compares many 401k choices side by side. */
  compare?: boolean;
  title?: string;
}

export const PaycheckCalculator: React.FC<Props> = ({ initial, compare = true, title = 'Paycheck calculator (2026, California)' }) => {
  const base: PaycheckInput = { ...DEFAULT_PAYCHECK, ...initial };
  const [p, setP] = useState<PaycheckInput>(base);
  const set = (patch: Partial<PaycheckInput>) => setP((x) => ({ ...x, ...patch }));
  const r = useMemo(() => computePaycheck(p), [p]);
  const c = r.perCheck;
  const hsaLimit = p.status === 'married' ? LIMIT_HSA_FAMILY : LIMIT_HSA_SELF;

  const scenarios: { name: string; patch: Partial<PaycheckInput> }[] = [
    { name: 'No retirement saving', patch: { trad401k: 0, roth401k: 0, hsa: 0, fsa: 0 } },
    { name: 'Only the 4% match, traditional', patch: { trad401k: p.salary * 0.04, roth401k: 0, hsa: 0, fsa: 0 } },
    { name: 'Only the 4% match, Roth', patch: { trad401k: 0, roth401k: p.salary * 0.04, hsa: 0, fsa: 0 } },
    { name: '10% Roth', patch: { trad401k: 0, roth401k: p.salary * 0.1, hsa: 0, fsa: 0 } },
    { name: '15% Roth', patch: { trad401k: 0, roth401k: p.salary * 0.15, hsa: 0, fsa: 0 } },
    { name: 'Max 401k, traditional', patch: { trad401k: LIMIT_401K, roth401k: 0, hsa: 0, fsa: 0 } },
    { name: 'Max 401k, Roth', patch: { trad401k: 0, roth401k: LIMIT_401K, hsa: 0, fsa: 0 } },
    { name: 'Max Roth 401k + HSA', patch: { trad401k: 0, roth401k: LIMIT_401K, hsa: hsaLimit, fsa: 0 } },
    { name: 'Max Roth 401k + HSA + FSA', patch: { trad401k: 0, roth401k: LIMIT_401K, hsa: hsaLimit, fsa: LIMIT_FSA } },
  ];
  const rows = compare
    ? scenarios.map((s) => {
        const x = computePaycheck({ ...p, ...s.patch });
        return [s.name, money(x.perCheck.net), money(x.totalTaxes), pct(x.effectiveRate), money(x.investedPerYear + x.employerMatch)];
      })
    : [];

  const ssStopsAt = r.ficaWages > SS_WAGE_BASE ? Math.ceil(SS_WAGE_BASE / (r.ficaWages / p.periods)) : null;

  return (
    <CalcFrame
      title={title}
      subtitle="Every number is a dial. Change any of them and the whole stub updates."
      presets={[
        { label: '$100k, max Roth 401k', apply: () => setP({ ...DEFAULT_PAYCHECK }) },
        { label: 'Same, traditional 401k', apply: () => setP({ ...DEFAULT_PAYCHECK, trad401k: LIMIT_401K, roth401k: 0 }) },
        { label: 'Only the match (4% Roth)', apply: () => setP({ ...DEFAULT_PAYCHECK, trad401k: 0, roth401k: 4000 }) },
        { label: 'Nothing saved', apply: () => setP({ ...DEFAULT_PAYCHECK, trad401k: 0, roth401k: 0 }) },
        { label: 'Max Roth 401k + HSA + FSA', apply: () => setP({ ...DEFAULT_PAYCHECK, hsa: LIMIT_HSA_SELF, fsa: LIMIT_FSA }) },
        { label: 'Married, 2 kids', apply: () => setP({ ...DEFAULT_PAYCHECK, status: 'married', kids: 2, healthPremium: 380, hsa: LIMIT_HSA_FAMILY }) },
        { label: 'Paid monthly', apply: () => setP((x) => ({ ...x, periods: 12, healthPremium: Math.round(((x.healthPremium * x.periods) / 12) * 100) / 100, dentalVision: Math.round(((x.dentalVision * x.periods) / 12) * 100) / 100 })) },
        { label: '$250k salary', apply: () => set({ salary: 250000 }) },
        { label: 'Side income, nothing withheld', apply: () => set({ otherIncome: 20000 }) },
        { label: 'Extra $100 withheld each check', apply: () => set({ extraWithholding: 100 }) },
      ]}
      inputs={
        <>
          <GroupLabel>Your job</GroupLabel>
          <NumField label="Salary (gross, per year)" value={p.salary} onChange={(n) => set({ salary: n })} prefix="$" min={0} step={1000} slider max={400000} />
          <Choice label="Paid" value={p.periods} onChange={(n) => setP((x) => ({ ...x, periods: n, healthPremium: Math.round(((x.healthPremium * x.periods) / n) * 100) / 100, dentalVision: Math.round(((x.dentalVision * x.periods) / n) * 100) / 100 }))} options={[{ value: 26, label: 'Every 2 weeks (26)' }, { value: 24, label: 'Twice a month (24)' }, { value: 12, label: 'Monthly (12)' }, { value: 52, label: 'Weekly (52)' }]} />
          <Choice label="Filing status" value={p.status} onChange={(v) => set({ status: v })} options={[{ value: 'single', label: 'Single' }, { value: 'married', label: 'Married, jointly' }]} />
          <div className="grid grid-cols-2 gap-2">
            <NumField label="Kids under 17" value={p.kids} onChange={(n) => set({ kids: Math.round(n) })} min={0} max={8} help="$2,200 credit each" />
            <NumField label="Other dependents" value={p.otherDependents} onChange={(n) => set({ otherDependents: Math.round(n) })} min={0} max={8} help="$500 credit each" />
          </div>
          <GroupLabel>Retirement (401k)</GroupLabel>
          <NumField label="Roth 401k (after tax)" value={p.roth401k} onChange={(n) => set({ roth401k: n })} prefix="$" min={0} max={LIMIT_401K} step={500} slider help={`${pct((p.roth401k / Math.max(1, p.salary)) * 100)} of pay`} />
          <NumField label="Traditional 401k (pre-tax)" value={p.trad401k} onChange={(n) => set({ trad401k: n })} prefix="$" min={0} max={LIMIT_401K} step={500} slider help={`${pct((p.trad401k / Math.max(1, p.salary)) * 100)} of pay`} />
          <NumField label="Employer match" value={p.matchPct} onChange={(n) => set({ matchPct: n })} suffix="% of salary" min={0} max={12} step={0.5} help="free money, only if you contribute" />
          {p.trad401k + p.roth401k > LIMIT_401K && <p className="text-xs text-red-700">Over the $24,500 limit for 2026.</p>}
          <GroupLabel>Benefits (pre-tax)</GroupLabel>
          <NumField label="Your health premium per paycheck" help="changing how often you are paid keeps the yearly cost the same" value={p.healthPremium} onChange={(n) => set({ healthPremium: n })} prefix="$" min={0} step={10} />
          <NumField label="Dental and vision per paycheck" value={p.dentalVision} onChange={(n) => set({ dentalVision: n })} prefix="$" min={0} step={5} />
          <NumField label="HSA (per year)" value={p.hsa} onChange={(n) => set({ hsa: n })} prefix="$" min={0} max={hsaLimit} step={100} slider help={`2026 limit ${money(hsaLimit)}`} />
          <NumField label="Health FSA (per year)" value={p.fsa} onChange={(n) => set({ fsa: n })} prefix="$" min={0} max={LIMIT_FSA} step={100} slider help="2026 limit $3,400" />
          <GroupLabel>Withholding quirks</GroupLabel>
          <NumField label="Other income with no tax withheld" value={p.otherIncome} onChange={(n) => set({ otherIncome: n })} prefix="$" min={0} step={1000} help="side work, interest" />
          <NumField label="Extra federal withholding per paycheck" value={p.extraWithholding} onChange={(n) => set({ extraWithholding: n })} prefix="$" min={0} step={10} help="W-4 step 4(c)" />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label={`Take-home per paycheck (${p.periods}/yr)`} value={money(c.net, 2)} tone="good" sub={`${money(r.takeHomeAnnual)} a year`} />
            <Stat label="Total taxes per year" value={money(r.totalTaxes)} tone="bad" sub={`${pct(r.effectiveRate)} of gross`} />
            <Stat label="Building for your future" value={money(r.investedPerYear + r.employerMatch)} sub={`401k ${money(r.trad401k + r.roth401k)} + HSA ${money(p.hsa)} + match ${money(r.employerMatch)}`} />
            <Stat label="At tax time" value={r.owedOrRefund >= 0 ? `Refund ${money(r.owedOrRefund)}` : `You owe ${money(-r.owedOrRefund)}`} tone={r.owedOrRefund >= 0 ? 'good' : 'bad'} sub="withheld minus actual tax" />
          </Stats>
          <DataTable
            headers={['Paycheck stub', 'Per paycheck', 'Per year']}
            maxHeight={460}
            rows={[
              ['Gross pay', money(c.gross, 2), money(r.gross)],
              ['Health, dental, vision (pre-tax)', `-${money(c.health, 2)}`, `-${money(c.health * p.periods)}`],
              ['HSA and FSA (pre-tax)', `-${money(c.hsaFsa, 2)}`, `-${money(p.hsa + p.fsa)}`],
              ['Traditional 401k (pre-tax)', `-${money(c.trad401k, 2)}`, `-${money(r.trad401k)}`],
              ['Federal income tax', `-${money(c.fed, 2)}`, `-${money(r.withheldFed)}`],
              ['Social Security (6.2%)', `-${money(c.ss, 2)}`, `-${money(r.ss)}`],
              ['Medicare (1.45%)', `-${money(c.medicare, 2)}`, `-${money(r.medicare + r.addlMedicare)}`],
              ['California income tax', `-${money(c.ca, 2)}`, `-${money(r.withheldCA)}`],
              ['California SDI (1.3%)', `-${money(c.sdi, 2)}`, `-${money(r.sdi)}`],
              ['Roth 401k (after tax)', `-${money(c.roth401k, 2)}`, `-${money(r.roth401k)}`],
              ['NET PAY (deposited)', money(c.net, 2), money(r.takeHomeAnnual)],
            ]}
            highlight={(row) => String(row[0]).startsWith('NET')}
          />
          <MathBlock
            lines={[
              { label: 'Pre-tax benefits', formula: `premiums + HSA + FSA`, value: money(r.sec125) },
              { label: 'Income-tax wages', formula: `${money(r.gross)} - benefits - traditional 401k`, value: money(r.fedWages) },
              { label: 'Social Security wages', formula: `${money(r.gross)} - benefits (401k does not reduce it)`, value: money(r.ficaWages), indent: true },
              { label: 'California wages', formula: 'same, but an HSA is NOT deductible in California', value: money(r.caWages), indent: true },
              { label: 'Federal taxable', formula: `income-tax wages - standard deduction`, value: money(r.taxableFed) },
              { label: 'Federal tax', formula: `bracket math, marginal ${r.federalMarginal}%` + (r.childCredit ? `, minus ${money(r.childCredit)} credits` : ''), value: money(r.withheldFed - p.extraWithholding * p.periods) },
              { label: 'California tax', formula: `on ${money(r.taxableCA)}, marginal ${r.caMarginal}%`, value: money(r.withheldCA) },
              { label: 'Social Security', formula: `${money(Math.min(r.ficaWages, SS_WAGE_BASE))} x 6.2%`, value: money(r.ss) },
              { label: 'Medicare', formula: `${money(r.ficaWages)} x 1.45%`, value: money(r.medicare) },
              { label: 'SDI', formula: `${money(r.ficaWages)} x 1.3%`, value: money(r.sdi) },
              { label: 'Net', formula: 'gross - benefits - 401k - all taxes', value: money(r.takeHomeAnnual), strong: true },
            ]}
          />
          {ssStopsAt && <Note>Above ${SS_WAGE_BASE.toLocaleString('en-US')} Social Security stops. At this salary it stops around paycheck {ssStopsAt}, so the later checks are bigger. That is one reason a single stub is only an estimate.</Note>}
        </>
      }
      below={
        <>
          <StackedBar
            title="Where your gross pay goes in a year"
            format={money}
            parts={[
              { label: 'Take-home', value: Math.max(0, r.takeHomeAnnual), color: '#0f766e' },
              { label: 'Roth 401k', value: r.roth401k, color: '#2563eb' },
              { label: 'Traditional 401k, HSA, FSA', value: r.trad401k + p.hsa + p.fsa, color: '#6d28d9' },
              { label: 'Health benefits', value: c.health * p.periods, color: '#be185d' },
              { label: 'Federal income tax', value: r.withheldFed, color: 'var(--primary)' },
              { label: 'California tax + SDI', value: r.withheldCA + r.sdi, color: '#b45309' },
              { label: 'Social Security + Medicare', value: r.ss + r.medicare + r.addlMedicare, color: '#475569' },
            ]}
          />
          {compare && (
            <>
              <p className="text-sm font-semibold text-foreground">Many choices at once (everything else stays as set above)</p>
              <DataTable headers={['Choice', 'Take-home per check', 'Taxes per year', 'Effective tax', 'Saved for you (incl. match)']} rows={rows} maxHeight={380} />
            </>
          )}
          <Note>An estimate. Real withholding comes from the employer&apos;s payroll system, your W-4, and rounding. Final tax is settled when you file. Federal: IRS 2026. California: FTB 2026 indexed amounts, SDI 1.3% (EDD). 401k limit $24,500, HSA $4,400 / $8,750, FSA $3,400.</Note>
        </>
      }
    />
  );
};
