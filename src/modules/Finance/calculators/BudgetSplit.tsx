import { useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, MathBlock, Note, GroupLabel } from './ui';
import { StackedBar } from './charts';
import { money, pct } from './lib/fmt';

// Fixed income covers fixed expenses. Variable income covers variable expenses. Save what is left.
export const BudgetSplit: React.FC = () => {
  const [fixedIncome, setFixedIncome] = useState(5200);
  const [variableIncome, setVariableIncome] = useState(900);
  const [rent, setRent] = useState(1900);
  const [insurance, setInsurance] = useState(320);
  const [phone, setPhone] = useState(120);
  const [debtMin, setDebtMin] = useState(250);
  const [groceries, setGroceries] = useState(500);
  const [eating, setEating] = useState(300);
  const [fun, setFun] = useState(250);
  const [shopping, setShopping] = useState(200);

  const fixedExp = rent + insurance + phone + debtMin;
  const variableExp = groceries + eating + fun + shopping;
  const fixedLeft = fixedIncome - fixedExp;
  const variableLeft = variableIncome - variableExp;
  const save = fixedLeft + variableLeft;
  const total = fixedIncome + variableIncome;

  return (
    <CalcFrame
      title="Fixed covers fixed. Variable covers variable."
      subtitle="Monthly, after taxes. The rule: your steady paycheck pays the bills that never change, and the income that moves pays for the spending that moves."
      presets={[
        { label: 'No variable income yet', apply: () => { setVariableIncome(0); } },
        { label: 'Add $1,500 side income', apply: () => { setVariableIncome(1500); } },
        { label: 'Rent too high', apply: () => { setRent(3000); } },
        { label: 'Lifestyle creep', apply: () => { setEating(700); setFun(600); setShopping(550); } },
      ]}
      inputs={
        <>
          <GroupLabel>Income per month (take-home)</GroupLabel>
          <NumField label="Fixed income (the 9-5)" value={fixedIncome} onChange={setFixedIncome} prefix="$" min={0} step={100} />
          <NumField label="Variable income (side work, freelance, bonus)" value={variableIncome} onChange={setVariableIncome} prefix="$" min={0} step={100} />
          <GroupLabel>Fixed expenses (same every month)</GroupLabel>
          <div className="grid grid-cols-2 gap-2">
            <NumField label="Rent / mortgage" value={rent} onChange={setRent} prefix="$" min={0} step={50} />
            <NumField label="Insurance" value={insurance} onChange={setInsurance} prefix="$" min={0} step={10} />
            <NumField label="Phone / internet" value={phone} onChange={setPhone} prefix="$" min={0} step={10} />
            <NumField label="Debt minimums" value={debtMin} onChange={setDebtMin} prefix="$" min={0} step={10} />
          </div>
          <GroupLabel>Variable expenses (change every month)</GroupLabel>
          <div className="grid grid-cols-2 gap-2">
            <NumField label="Groceries" value={groceries} onChange={setGroceries} prefix="$" min={0} step={25} />
            <NumField label="Eating out" value={eating} onChange={setEating} prefix="$" min={0} step={25} />
            <NumField label="Fun" value={fun} onChange={setFun} prefix="$" min={0} step={25} />
            <NumField label="Shopping" value={shopping} onChange={setShopping} prefix="$" min={0} step={25} />
          </div>
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="Fixed income - fixed expenses" value={money(fixedLeft)} tone={fixedLeft >= 0 ? 'good' : 'bad'} sub={fixedLeft >= 0 ? 'your base is covered' : 'your 9-5 does not cover your bills'} />
            <Stat label="Variable income - variable expenses" value={money(variableLeft)} tone={variableLeft >= 0 ? 'good' : 'bad'} sub={variableLeft >= 0 ? 'spending is paid for' : 'overspending'} />
            <Stat label="Left to save and invest" value={money(save)} tone={save >= 0 ? 'good' : 'bad'} sub={`${pct(total ? (save / total) * 100 : 0, 0)} of income`} />
            <Stat label="Fixed expenses are" value={pct(fixedIncome ? (fixedExp / fixedIncome) * 100 : 0, 0)} sub="of fixed income. Lower is safer" />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Fixed expenses', formula: `${money(rent)} + ${money(insurance)} + ${money(phone)} + ${money(debtMin)}`, value: money(fixedExp) },
              { label: 'Fixed left over', formula: `${money(fixedIncome)} - ${money(fixedExp)}`, value: money(fixedLeft) },
              { label: 'Variable expenses', formula: `${money(groceries)} + ${money(eating)} + ${money(fun)} + ${money(shopping)}`, value: money(variableExp) },
              { label: 'Variable left over', formula: `${money(variableIncome)} - ${money(variableExp)}`, value: money(variableLeft) },
              { label: 'Save', formula: `${money(fixedLeft)} + ${money(variableLeft)}`, value: money(save), strong: true },
            ]}
          />
        </>
      }
      below={
        <>
          <StackedBar
            title="Where each month goes"
            format={money}
            parts={[
              { label: 'Fixed expenses', value: fixedExp, color: '#475569' },
              { label: 'Variable expenses', value: variableExp, color: '#b45309' },
              { label: 'Saved and invested', value: Math.max(0, save), color: '#0f766e' },
            ]}
          />
          <Note>If the variable side is negative, cut spending first, then grow variable income. If the fixed side is negative, the problem is rent or debt, not groceries.</Note>
        </>
      }
    />
  );
};
