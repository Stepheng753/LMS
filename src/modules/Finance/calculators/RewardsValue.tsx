import { useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, MathBlock, Note } from './ui';
import { money } from './lib/fmt';

// Points are real, as long as you never pay interest.
export const RewardsValue: React.FC = () => {
  const [spend, setSpend] = useState(2500);
  const [rate, setRate] = useState(1.5);
  const [cent, setCent] = useState(1);
  const [fee, setFee] = useState(0);
  const [carry, setCarry] = useState(0);
  const [apr, setApr] = useState(24);

  const points = spend * 12 * rate;
  const value = (points * cent) / 100;
  const net = value - fee;
  const interest = carry * (apr / 100);

  return (
    <CalcFrame
      title="What are rewards points worth?"
      subtitle="Rule of thumb: 1 point is about 1 cent. A card earning 1.5 points per dollar gives you about 1.5% back."
      presets={[
        { label: '1 point per $ (basic)', apply: () => setRate(1) },
        { label: '2 points per $', apply: () => setRate(2) },
        { label: '$95 annual fee, 3x on dining', apply: () => { setFee(95); setRate(2.5); } },
        { label: 'Carry a $3,000 balance', apply: () => setCarry(3000) },
      ]}
      inputs={
        <>
          <NumField label="Spend per month on the card" value={spend} onChange={setSpend} prefix="$" min={0} step={100} />
          <NumField label="Points per dollar (your average)" value={rate} onChange={setRate} min={0} max={10} step={0.25} slider />
          <NumField label="Value of one point" value={cent} onChange={setCent} suffix="cents" min={0} max={3} step={0.1} help="1 cent is the safe default" />
          <NumField label="Annual fee" value={fee} onChange={setFee} prefix="$" min={0} step={5} />
          <NumField label="Balance you carry month to month (average)" value={carry} onChange={setCarry} prefix="$" min={0} step={500} help="the habit to avoid" />
          {carry > 0 && <NumField label="Card interest rate (APR)" value={apr} onChange={setApr} suffix="%" min={0} max={36} step={0.5} />}
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="Points per year" value={Math.round(points).toLocaleString('en-US')} />
            <Stat label="Worth" value={money(value)} tone="good" sub={`${(rate * cent).toFixed(2)}% back on spending`} />
            <Stat label="After the fee" value={money(net)} tone={net >= 0 ? 'good' : 'bad'} />
            <Stat label="Interest if you carry a balance" value={money(interest)} tone={interest > 0 ? 'bad' : 'normal'} sub={carry > 0 ? `${money(net - interest)} after rewards: a loss` : 'you pay none'} />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Points per year', formula: `${money(spend)} x 12 x ${rate}`, value: Math.round(points).toLocaleString('en-US') },
              { label: 'Value', formula: `${Math.round(points).toLocaleString('en-US')} points x ${cent} cent`, value: money(value), strong: true },
              ...(carry > 0 ? [{ label: 'Interest cost', formula: `${money(carry)} x ${apr}%`, value: money(interest) }] : []),
            ]}
          />
          <Note>If you carry a balance, the interest costs far more than the points ever earn. Rewards are a bonus for people who pay in full, never a reason to spend more.</Note>
        </>
      }
    />
  );
};
