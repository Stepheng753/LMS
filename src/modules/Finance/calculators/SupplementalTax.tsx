import { useState } from 'react';
import { CalcFrame, NumField, Choice, Stat, Stats, MathBlock, Note } from './ui';
import { supplementalTax } from './lib/mortgage';
import { money } from './lib/fmt';

const MONTHS: { value: number; label: string }[] = [
  { value: 1, label: 'Jul' }, { value: 2, label: 'Aug' }, { value: 3, label: 'Sep' }, { value: 4, label: 'Oct' }, { value: 5, label: 'Nov' }, { value: 6, label: 'Dec' },
  { value: 7, label: 'Jan' }, { value: 8, label: 'Feb' }, { value: 9, label: 'Mar' }, { value: 10, label: 'Apr' }, { value: 11, label: 'May' }, { value: 12, label: 'Jun' },
];

// California supplemental property tax: a one-time extra bill after you buy.
export const SupplementalTaxCalc: React.FC = () => {
  const [oldAssessed, setOld] = useState(320000);
  const [price, setPrice] = useState(500000);
  const [rate, setRate] = useState(1.15);
  const [closeIdx, setCloseIdx] = useState(5); // closing in November

  // closing in month idx of the fiscal year (Jul = 1): months left until June 30 = 12 - (idx - 1)
  const monthsLeft = 13 - closeIdx;
  const s = supplementalTax({ newAssessed: price, oldAssessed, taxRatePct: rate, monthsRemaining: monthsLeft });

  return (
    <CalcFrame
      title="California supplemental property tax"
      subtitle="You buy, the county reassesses your home at the price you paid, and mails a one-time bill for the difference."
      presets={[
        { label: 'Seller bought long ago', apply: () => { setOld(180000); } },
        { label: 'Seller bought recently', apply: () => { setOld(480000); } },
        { label: 'Close in July (start of the fiscal year)', apply: () => setCloseIdx(1) },
        { label: 'Close in June (end)', apply: () => setCloseIdx(12) },
      ]}
      inputs={
        <>
          <NumField label="Your purchase price (the new assessed value)" value={price} onChange={setPrice} prefix="$" min={0} step={10000} />
          <NumField label="The seller's old assessed value" value={oldAssessed} onChange={setOld} prefix="$" min={0} step={10000} help="Prop 13 froze it at what they paid plus up to 2% a year" />
          <NumField label="Property tax rate" value={rate} onChange={setRate} suffix="%" min={0} max={3} step={0.05} />
          <Choice label="Month you close" value={closeIdx} onChange={setCloseIdx} options={MONTHS} />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="Added assessed value" value={money(s.diff)} />
            <Stat label="Full-year tax on that" value={money(s.fullYear)} />
            <Stat label="Supplemental bill (one time)" value={money(s.bill)} tone="bad" sub={`${monthsLeft} of 12 months of the fiscal year left`} />
            <Stat label="Then your regular bill" value={money((price * rate) / 100)} sub="a year on the new value" />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Increase in assessed value', formula: `${money(price)} - ${money(oldAssessed)}`, value: money(s.diff) },
              { label: 'Tax on the increase for a full year', formula: `${money(s.diff)} x ${rate}%`, value: money(s.fullYear) },
              { label: 'Prorated to June 30', formula: `${money(s.fullYear)} x ${monthsLeft}/12`, value: money(s.bill), strong: true },
            ]}
          />
          <Note>The fiscal year runs July 1 to June 30. Supplemental bills often arrive months after closing, are separate from your mortgage payment, and are usually not included in an escrow account. Plan the cash. Details vary by county. Check with the county assessor.</Note>
        </>
      }
    />
  );
};
