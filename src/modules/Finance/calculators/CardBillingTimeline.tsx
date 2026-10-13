import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Choice, Stat, Stats, MathBlock, Note } from './ui';
import { money } from './lib/fmt';

const DAY = 86_400_000;
const parseDate = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
};
const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY);

// Billing period, statement date, due date, grace period: the three dates on every card.
export const CardBillingTimeline: React.FC = () => {
  const [purchase, setPurchase] = useState('2026-11-03');
  const [closeDay, setCloseDay] = useState(15);
  const [graceDays, setGraceDays] = useState(25);
  const [amount, setAmount] = useState(400);
  const [apr, setApr] = useState(24);
  const [pay, setPay] = useState<'full' | 'min' | 'none'>('full');

  const r = useMemo(() => {
    const p = parseDate(purchase);
    // first closing date on or after the purchase date
    let close = new Date(Date.UTC(p.getUTCFullYear(), p.getUTCMonth(), Math.min(closeDay, 28)));
    if (close.getTime() < p.getTime()) close = new Date(Date.UTC(p.getUTCFullYear(), p.getUTCMonth() + 1, Math.min(closeDay, 28)));
    const prevClose = new Date(Date.UTC(close.getUTCFullYear(), close.getUTCMonth() - 1, Math.min(closeDay, 28)));
    const due = addDays(close, graceDays);
    const toStatement = Math.round((close.getTime() - p.getTime()) / DAY);
    const toDue = Math.round((due.getTime() - p.getTime()) / DAY);
    const bestDay = addDays(close, 1);
    const minPay = Math.max(Math.min(35, amount), amount * 0.02);
    const paid = pay === 'full' ? amount : pay === 'min' ? minPay : 0;
    const left = amount - paid;
    // Carrying a balance means the grace period is gone: interest also covers the days since purchase.
    const interestBefore = pay === 'full' ? 0 : (amount * (apr / 100) * toStatement) / 365;
    const interestAfter = (left * (apr / 100) * 30) / 365;
    return { close, prevClose, due, toStatement, toDue, bestDay, minPay, paid, left, interest: interestBefore + interestAfter, interestBefore, interestAfter };
  }, [purchase, closeDay, graceDays, amount, apr, pay]);

  return (
    <CalcFrame
      title="Billing period, statement date and due date"
      subtitle="Pick a purchase date and see exactly when it is billed and when it must be paid."
      presets={[
        { label: 'Buy the day before it closes', apply: () => { setPurchase('2026-11-14'); } },
        { label: 'Buy the day after it closes', apply: () => { setPurchase('2026-11-16'); } },
        { label: 'Only pay the minimum', apply: () => setPay('min') },
        { label: 'Pay in full', apply: () => setPay('full') },
      ]}
      inputs={
        <>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Purchase date</span>
            <input type="date" value={purchase} onChange={(e) => e.target.value && setPurchase(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </label>
          <NumField label="Statement closes on day" value={closeDay} onChange={(n) => setCloseDay(Math.round(n))} min={1} max={28} slider help="of every month (your billing cycle ends)" />
          <NumField label="Payment due this many days after it closes" value={graceDays} onChange={setGraceDays} suffix="days" min={21} max={30} slider help="21 days minimum by law" />
          <NumField label="Purchase amount" value={amount} onChange={setAmount} prefix="$" min={0} step={50} />
          <NumField label="Card interest rate (APR)" value={apr} onChange={setApr} suffix="%" min={0} max={36} step={0.5} />
          <Choice label="On the due date you pay" value={pay} onChange={setPay} options={[{ value: 'full', label: 'Statement in full' }, { value: 'min', label: 'Only the minimum' }, { value: 'none', label: 'Nothing' }]} />
        </>
      }
      results={
        <>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { k: 'You buy', v: fmtDate(parseDate(purchase)), s: 'purchase' },
              { k: 'Statement closes', v: fmtDate(r.close), s: `${r.toStatement} days later` },
              { k: 'Payment due', v: fmtDate(r.due), s: `${r.toDue} days after buying` },
            ].map((x, i) => (
              <div key={i} className="rounded-lg border border-border bg-card px-2 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{x.k}</p>
                <p className="font-serif text-lg font-bold text-foreground">{x.v}</p>
                <p className="text-xs text-muted-foreground">{x.s}</p>
              </div>
            ))}
          </div>
          <Stats>
            <Stat label="Billing period that holds it" value={`${fmtDate(addDays(r.prevClose, 1))} to ${fmtDate(r.close)}`} />
            <Stat label="Free days to pay (float)" value={`${r.toDue} days`} sub="no interest if paid in full" tone="good" />
            <Stat label="Interest you pay" value={money(r.interest, 2)} tone={r.interest > 0 ? 'bad' : 'good'} sub={pay === 'full' ? 'zero: that is the grace period' : 'the grace period is gone'} />
            <Stat label="Best day to buy" value={fmtDate(r.bestDay)} sub="the day after it closes: the longest float" />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Statement balance', formula: 'all purchases in the billing period', value: money(amount) },
              { label: 'Minimum payment', formula: 'about 2% of the balance, at least $35', value: money(r.minPay, 2) },
              { label: 'You pay', value: money(r.paid, 2) },
              { label: 'Interest from purchase to statement', formula: `${money(amount)} x ${apr}% x ${r.toStatement}/365 (only if not paid in full)`, value: money(r.interestBefore, 2) },
              { label: 'Interest next month on the rest', formula: `${money(r.left, 2)} x ${apr}% x 30/365`, value: money(r.interestAfter, 2) },
            ]}
          />
          <Note>Real cards compute interest on your average daily balance. This keeps the idea clear: pay the full statement and the interest is zero, pay less and you lose the free days on the whole balance.</Note>
        </>
      }
    />
  );
};
