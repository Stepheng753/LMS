import { useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, MathBlock, Note } from './ui';
import { money } from './lib/fmt';

// How big, and how long to build.
export const EmergencyFund: React.FC = () => {
  const [essentials, setEssentials] = useState(3200);
  const [months, setMonths] = useState(4);
  const [have, setHave] = useState(800);
  const [perMonth, setPerMonth] = useState(500);
  const [apy, setApy] = useState(4);

  const target = essentials * months;
  const gap = Math.max(0, target - have);
  let m = 0;
  let bal = have;
  while (bal < target && m < 600 && perMonth + bal * (apy / 100 / 12) > 0) {
    bal = bal * (1 + apy / 100 / 12) + perMonth;
    m++;
  }
  const ok = bal >= target;

  return (
    <CalcFrame
      title="Emergency fund target"
      subtitle="Cash you can reach in a day, for things that break: a job, a car, a body."
      presets={[
        { label: '3 months', apply: () => setMonths(3) },
        { label: '6 months', apply: () => setMonths(6) },
        { label: 'Starting from zero', apply: () => setHave(0) },
        { label: 'Save $1,000 a month', apply: () => setPerMonth(1000) },
      ]}
      inputs={
        <>
          <NumField label="Essentials per month (rent, food, insurance, minimums, utilities)" value={essentials} onChange={setEssentials} prefix="$" min={0} step={100} />
          <NumField label="Months of cover" value={months} onChange={setMonths} suffix="months" min={1} max={12} slider />
          <NumField label="Already saved" value={have} onChange={setHave} prefix="$" min={0} step={100} />
          <NumField label="You can add per month" value={perMonth} onChange={setPerMonth} prefix="$" min={0} step={50} />
          <NumField label="Interest on savings (APY)" value={apy} onChange={setApy} suffix="%" min={0} max={10} step={0.25} help="a high-yield savings account" />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="Your target" value={money(target)} />
            <Stat label="Still to go" value={money(gap)} tone={gap === 0 ? 'good' : 'normal'} />
            <Stat label="Time to build it" value={gap === 0 ? 'Done' : ok ? `${Math.floor(m / 12)}y ${m % 12}m` : 'never'} sub={ok ? `${m} months` : 'add more per month'} tone={ok ? 'good' : 'bad'} />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Target', formula: `${money(essentials)} x ${months} months`, value: money(target), strong: true },
              { label: 'Gap', formula: `${money(target)} - ${money(have)}`, value: money(gap) },
              { label: 'Without interest', formula: `${money(gap)} / ${money(perMonth)}`, value: perMonth > 0 ? `${Math.ceil(gap / perMonth)} months` : 'never' },
            ]}
          />
          <Note>Keep it in a separate high-yield savings account, not in the investments. It is insurance, not an investment.</Note>
        </>
      }
    />
  );
};
