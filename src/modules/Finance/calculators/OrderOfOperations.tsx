import { useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, DataTable, Note, GroupLabel } from './ui';
import { StackedBar } from './charts';
import { LIMIT_401K, LIMIT_FSA, LIMIT_HSA_SELF, LIMIT_IRA } from './lib/paycheck';
import { money } from './lib/fmt';

// Money flows down the ladder. Each step fills before the next one gets a dollar.
export const OrderOfOperations: React.FC = () => {
  const [monthly, setMonthly] = useState(2500);
  const [salary, setSalary] = useState(100000);
  const [match, setMatch] = useState(4);
  const [debt, setDebt] = useState(6000);
  const [efTarget, setEfTarget] = useState(15000);
  const [efHave, setEfHave] = useState(3000);

  const matchMonthly = (salary * (match / 100)) / 12;
  const steps: { name: string; cap: number; note: string }[] = [
    { name: '1a. Employer match (free money)', cap: matchMonthly, note: `${match}% of salary` },
    { name: '1b. Pay off bad debt', cap: debt, note: 'every dollar until the balance is gone' },
    { name: '2. Emergency fund', cap: Math.max(0, efTarget - efHave), note: 'until it hits the target' },
    { name: '3. Roth IRA', cap: LIMIT_IRA / 12, note: `${money(LIMIT_IRA)} a year` },
    { name: '4. 401k above the match', cap: Math.max(0, LIMIT_401K / 12 - matchMonthly), note: `${money(LIMIT_401K)} a year total` },
    { name: '5a. HSA', cap: LIMIT_HSA_SELF / 12, note: `${money(LIMIT_HSA_SELF)} a year, needs a high-deductible plan` },
    { name: '5b. FSA', cap: LIMIT_FSA / 12, note: `${money(LIMIT_FSA)} a year, use it or lose it` },
    { name: '6. Taxable brokerage', cap: Infinity, note: 'no limit: the rest' },
  ];
  let left = monthly;
  const alloc = steps.map((s) => {
    const put = Math.max(0, Math.min(left, s.cap));
    left -= put;
    return { ...s, put };
  });
  const debtPut = alloc[1].put;
  const efPut = alloc[2].put;
  const monthsDebt = debtPut > 0 ? Math.ceil(debt / debtPut) : Infinity;
  const monthsEf = efPut > 0 ? Math.ceil(Math.max(0, efTarget - efHave) / efPut) : Infinity;

  return (
    <CalcFrame
      title="Your order of operations"
      subtitle="Enter the money you have to put to work each month and watch it fall down the ladder."
      presets={[
        { label: '$500 a month', apply: () => setMonthly(500) },
        { label: '$1,500 a month', apply: () => setMonthly(1500) },
        { label: '$4,000 a month', apply: () => setMonthly(4000) },
        { label: 'No debt', apply: () => setDebt(0) },
        { label: 'Emergency fund done', apply: () => setEfHave(efTarget) },
      ]}
      inputs={
        <>
          <NumField label="Money to put to work each month (after bills)" value={monthly} onChange={setMonthly} prefix="$" min={0} step={100} slider max={8000} />
          <GroupLabel>Your situation</GroupLabel>
          <NumField label="Salary" value={salary} onChange={setSalary} prefix="$" min={0} step={1000} />
          <NumField label="Employer match" value={match} onChange={setMatch} suffix="% of salary" min={0} max={12} step={0.5} />
          <NumField label="Bad debt left (cards, car, loans)" value={debt} onChange={setDebt} prefix="$" min={0} step={500} />
          <NumField label="Emergency fund target" value={efTarget} onChange={setEfTarget} prefix="$" min={0} step={500} />
          <NumField label="Emergency fund so far" value={efHave} onChange={setEfHave} prefix="$" min={0} step={500} />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="Debt gone in" value={debt === 0 ? 'no debt' : monthsDebt === Infinity ? 'never' : `${monthsDebt} months`} tone={debt === 0 ? 'good' : 'normal'} />
            <Stat label="Emergency fund full in" value={efTarget <= efHave ? 'done' : monthsEf === Infinity ? 'not yet' : `${monthsEf} months`} sub="at this pace, after the debt" />
            <Stat label="Left for the brokerage" value={money(alloc[7].put)} sub="only after everything above is full" />
            <Stat label="Unused" value={money(left)} sub={left > 0.5 ? 'can never happen: the brokerage has no limit' : ''} />
          </Stats>
          <DataTable headers={['Step', 'This month', 'Room in this step']} rows={alloc.map((a) => [a.name, money(a.put), a.cap === Infinity ? 'unlimited' : `${money(a.cap)} (${a.note})`])} maxHeight={380} />
        </>
      }
      below={
        <>
          <StackedBar title={`Where ${money(monthly)} goes this month`} format={money} parts={alloc.map((a) => ({ label: a.name.slice(a.name.indexOf('.') + 2), value: a.put }))} />
          <Note>Each month you re-run the ladder. Once the debt and the emergency fund are full, the same {money(monthly)} flows further down to the IRA, the 401k, the HSA and finally the brokerage.</Note>
        </>
      }
    />
  );
};
