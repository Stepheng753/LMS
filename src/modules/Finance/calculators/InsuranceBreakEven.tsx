import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, MathBlock, Note, GroupLabel } from './ui';
import { LineChart } from './charts';
import { money, moneyShort } from './lib/fmt';

interface Plan {
  premium: number; // per month, your share
  deductible: number;
  coinsurance: number; // % you pay after the deductible
  oopMax: number;
  employerHsa: number; // yearly money your employer puts in
}

const cost = (p: Plan, spend: number) => {
  const afterDed = Math.max(0, spend - p.deductible);
  const oop = Math.min(p.oopMax, Math.min(spend, p.deductible) + (afterDed * p.coinsurance) / 100);
  return p.premium * 12 + oop - p.employerHsa;
};

// Which health plan is cheaper for how much care you will use.
export const InsuranceBreakEven: React.FC = () => {
  const [a, setA] = useState<Plan>({ premium: 150, deductible: 3200, coinsurance: 20, oopMax: 6000, employerHsa: 500 });
  const [b, setB] = useState<Plan>({ premium: 330, deductible: 500, coinsurance: 10, oopMax: 2500, employerHsa: 0 });
  const [spend, setSpend] = useState(1500);
  const seta = (patch: Partial<Plan>) => setA((x) => ({ ...x, ...patch }));
  const setb = (patch: Partial<Plan>) => setB((x) => ({ ...x, ...patch }));

  const ca = cost(a, spend);
  const cb = cost(b, spend);
  const pts = useMemo(() => Array.from({ length: 31 }, (_, i) => i * 2000), []);
  // break-even: first spend where plan A becomes the more expensive plan
  let breakEven: number | null = null;
  for (let s = 0; s <= 80000; s += 100) {
    if ((cost(a, s) > cost(b, s)) !== (cost(a, 0) > cost(b, 0))) {
      breakEven = s;
      break;
    }
  }
  const spread = (title: string, plan: Plan, set: (p: Partial<Plan>) => void) => (
    <>
      <GroupLabel>{title}</GroupLabel>
      <div className="grid grid-cols-2 gap-2">
        <NumField label="Your premium / month" value={plan.premium} onChange={(n) => set({ premium: n })} prefix="$" min={0} step={10} />
        <NumField label="Deductible" value={plan.deductible} onChange={(n) => set({ deductible: n })} prefix="$" min={0} step={100} />
        <NumField label="You pay after deductible" value={plan.coinsurance} onChange={(n) => set({ coinsurance: n })} suffix="%" min={0} max={100} step={5} />
        <NumField label="Out-of-pocket max" value={plan.oopMax} onChange={(n) => set({ oopMax: n })} prefix="$" min={0} step={250} />
        <NumField label="Employer HSA gift / year" value={plan.employerHsa} onChange={(n) => set({ employerHsa: n })} prefix="$" min={0} step={50} />
      </div>
    </>
  );

  return (
    <CalcFrame
      title="Which health plan costs less?"
      subtitle="Total cost for a year = what you pay in premiums + what you pay when you use care, up to the out-of-pocket max."
      presets={[
        { label: 'Healthy year ($500)', apply: () => setSpend(500) },
        { label: 'Broken arm ($9,000)', apply: () => setSpend(9000) },
        { label: 'Baby ($25,000)', apply: () => setSpend(25000) },
        { label: 'Zero care', apply: () => setSpend(0) },
      ]}
      inputs={
        <>
          {spread('Plan A: high deductible (HDHP) with an HSA', a, seta)}
          {spread('Plan B: low deductible (PPO)', b, setb)}
          <NumField label="Medical bills this year (before insurance)" value={spend} onChange={setSpend} prefix="$" min={0} step={500} slider max={60000} />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="Plan A costs you" value={money(ca)} tone={ca <= cb ? 'good' : 'normal'} />
            <Stat label="Plan B costs you" value={money(cb)} tone={cb < ca ? 'good' : 'normal'} />
            <Stat label="Cheaper this year" value={ca <= cb ? 'Plan A' : 'Plan B'} sub={`by ${money(Math.abs(ca - cb))}`} />
            <Stat label="Break-even care" value={breakEven === null ? 'never' : money(breakEven)} sub="above this the other plan wins" />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Plan A premiums', formula: `${money(a.premium)} x 12`, value: money(a.premium * 12) },
              { label: 'Plan A you pay for care', formula: `deductible, then ${a.coinsurance}%, capped at ${money(a.oopMax)}`, value: money(Math.min(a.oopMax, Math.min(spend, a.deductible) + (Math.max(0, spend - a.deductible) * a.coinsurance) / 100)) },
              { label: 'Plan A minus employer HSA gift', value: `-${money(a.employerHsa)}` },
              { label: 'Plan A total', value: money(ca), strong: true },
              { label: 'Plan B total', formula: `${money(b.premium * 12)} premiums + care`, value: money(cb), strong: true },
            ]}
          />
        </>
      }
      below={
        <>
          <LineChart title="Total yearly cost at every level of medical bills" xLabel="Medical bills" xFormat={moneyShort} format={moneyShort} series={[{ name: 'Plan A (HDHP)', points: pts.map((s) => ({ x: s, y: cost(a, s) })) }, { name: 'Plan B (PPO)', points: pts.map((s) => ({ x: s, y: cost(b, s) })) }]} />
          <Note>The worst case on every plan is the out-of-pocket max plus premiums. HSA tax savings are not counted here, which makes the HDHP look a little worse than it really is.</Note>
        </>
      }
    />
  );
};
