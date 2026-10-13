import { useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, MathBlock, DataTable, Note } from './ui';
import { neededPortfolio } from './lib/retire';
import { money } from './lib/fmt';

// 4% of the pile = a year of spending. Then: how much to save to get there?
export const NeededToRetire: React.FC = () => {
  const [expenses, setExpenses] = useState(60000);
  const [pctOut, setPctOut] = useState(4);
  const [age, setAge] = useState(25);
  const [retireAge, setRetireAge] = useState(65);
  const [saved, setSaved] = useState(0);
  const [rate, setRate] = useState(10.5);
  const [inflation, setInflation] = useState(3);

  const years = Math.max(1, retireAge - age);
  const needNow = neededPortfolio(expenses, pctOut);
  const expensesThen = expenses * Math.pow(1 + inflation / 100, years);
  const needThen = neededPortfolio(expensesThen, pctOut);
  const r = rate / 100;
  const fvSaved = saved * Math.pow(1 + r, years);
  const gap = Math.max(0, needThen - fvSaved);
  const yearly = r > 0 ? (gap * r) / (Math.pow(1 + r, years) - 1) : gap / years;

  return (
    <CalcFrame
      title="How much do I need to retire?"
      subtitle={`Think in percentages: ${pctOut}% of what you have invested should equal a year of your spending.`}
      presets={[
        { label: '$40,000 a year', apply: () => setExpenses(40000) },
        { label: '$60,000 a year', apply: () => setExpenses(60000) },
        { label: '$100,000 a year', apply: () => setExpenses(100000) },
        { label: 'Retire at 55', apply: () => setRetireAge(55) },
        { label: 'Cautious: 3.5%', apply: () => setPctOut(3.5) },
        { label: 'Start at 35 instead', apply: () => setAge(35) },
      ]}
      inputs={
        <>
          <NumField label="What you spend per year in retirement (today's dollars)" value={expenses} onChange={setExpenses} prefix="$" min={0} step={1000} slider max={250000} />
          <NumField label="Withdraw this % of your investments each year" value={pctOut} onChange={setPctOut} suffix="%" min={1} max={10} step={0.25} slider />
          <NumField label="Your age now" value={age} onChange={(n) => setAge(Math.round(n))} min={18} max={80} />
          <NumField label="Age you stop working" value={retireAge} onChange={(n) => setRetireAge(Math.round(n))} min={30} max={90} />
          <NumField label="Invested so far" value={saved} onChange={setSaved} prefix="$" min={0} step={5000} />
          <NumField label="Expected yearly return" value={rate} onChange={setRate} suffix="%" min={0} max={20} step={0.5} />
          <NumField label="Inflation" value={inflation} onChange={setInflation} suffix="%" min={0} max={10} step={0.25} />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="You need invested (in today's dollars)" value={money(needNow)} tone="good" sub={`${pctOut}% of it = ${money(expenses)}`} />
            <Stat label={`In ${years} years, in future dollars`} value={money(needThen)} sub={`prices will be ${money(expensesThen)} a year`} />
            <Stat label="Save per year to get there" value={money(yearly)} tone="bad" sub={`${money(yearly / 12)} a month`} />
            <Stat label="Your growth in a year (at retirement)" value={money(needThen * (pctOut / 100))} sub="the withdrawal is the growth" />
          </Stats>
          <MathBlock
            lines={[
              { label: 'The thinking', formula: `${pctOut}% of invested = one year of spending`, value: '' },
              { label: 'So invested', formula: `${money(expenses)} / ${pctOut}%`, value: money(needNow), strong: true },
              { label: 'Same idea, as a multiple', formula: `1 / ${pctOut}% = ${(100 / pctOut).toFixed(1)}x your spending`, value: `${(100 / pctOut).toFixed(1)}x` },
              { label: 'Spending in future dollars', formula: `${money(expenses)} x (1 + ${inflation}%)^${years}`, value: money(expensesThen) },
              { label: 'Needed then', formula: `${money(expensesThen)} / ${pctOut}%`, value: money(needThen), strong: true },
              { label: 'Your savings so far grow to', formula: `${money(saved)} x (1 + ${rate}%)^${years}`, value: money(fvSaved) },
              { label: 'Yearly deposit needed', formula: 'gap x rate / ((1 + rate)^years - 1)', value: money(yearly), strong: true },
            ]}
          />
        </>
      }
      below={
        <>
          <DataTable
            headers={['If you withdraw', 'You need invested', 'Times your spending']}
            rows={[3, 3.5, 4, 4.5, 5, 6].map((w) => [`${w}%`, money(neededPortfolio(expenses, w)), `${(100 / w).toFixed(1)}x`])}
            highlight={(row) => String(row[0]) === `${pctOut}%`}
            maxHeight={260}
          />
          <Note>A lower withdrawal percentage needs a bigger pile but is safer. Social Security and any pension reduce what your investments must cover. Subtract them from your expenses first. Savings needed assume the return shown, which is an average, not a promise.</Note>
        </>
      }
    />
  );
};
