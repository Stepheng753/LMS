import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { SupplementalTaxCalc } from '../../calculators';

export default function Step10_7_Supplemental() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • Property Tax"
        title="The Supplemental Tax Bill: A Surprise After You Buy"
        summary="California re-assesses your home the moment you buy it, then mails a separate one-time bill for the difference. Most first-time buyers are not expecting it."
      />

      <Callout type="warning" title="Plan the cash">
        A <strong>supplemental property tax bill</strong> arrives a few months after closing. It is separate from your regular
        bill and from your mortgage, and it is often <strong>not</strong> paid through escrow. Set the money aside before you buy.
      </Callout>

      <Section title="Why it exists" />
      <p>
        The county&apos;s regular tax bill for the current fiscal year (July 1 to June 30) was built on the <em>previous
        owner&apos;s</em> low assessed value. When you buy, the county reassesses at your price. The supplemental bill
        collects the extra tax for the part of the year left <strong>after</strong> you bought.
      </p>
      <Flow
        steps={[
          { title: 'You buy', sub: 'the county records the sale' },
          { title: 'Reassessed', sub: 'new value = your purchase price', via: 'resets' },
          { title: 'The difference', sub: 'new value minus the old assessed value', via: 'compare' },
          { title: 'Prorated', sub: 'for the months left until June 30', via: 'multiply' },
          { title: 'Supplemental bill', sub: 'mailed 2 to 6 months later', via: 'one time' },
        ]}
      />

      <Section title="The math, for the condo" />
      <p>The seller owned the condo for years, so the old assessed value is $320,000. You pay $500,000 and close in November (8 months left in the fiscal year).</p>
      <Table
        headers={['Step', 'Calculation', 'Result']}
        align={['left', 'left', 'right']}
        rows={[
          ['Increase in assessed value', '$500,000 − $320,000', '$180,000'],
          ['Tax on the increase for a full year', '$180,000 × 1.15%', '$2,070'],
          ['Prorated for the months left', '$2,070 × 8 ÷ 12', '$1,380'],
          [<strong key="a">Supplemental bill</strong>, '', <strong key="b">about $1,380</strong>],
        ]}
      />
      <p>The timing of your closing changes the bill a lot:</p>
      <Table
        headers={['You close in', 'Months left to June 30', 'Supplemental bill']}
        align={['left', 'right', 'right']}
        rows={[
          ['July', '12', '$2,070'],
          ['November', '8', '$1,380'],
          ['March', '4', '$690'],
          ['June', '1', '$173'],
        ]}
      />
      <p>
        A closing just before July 1 can produce <em>two</em> supplemental bills (one for the rest of the current year, and one
        for the full next year). After that, your regular bill is based on the new value, and the normal 1.15% applies.
      </p>

      <Section title="If the seller owned it a short time" />
      <p>
        If the old assessed value is already close to the price, there is little difference and a small bill. A home last sold
        for $480,000 with a $500,000 purchase price has a $20,000 gap, or about $153 for 8 months. The bigger the gap, the
        bigger the bill.
      </p>

      <Section title="Calculate yours" />
      <p>Change the price, the seller&apos;s old assessed value (the county assessor&apos;s site shows it), the rate and the closing month.</p>
      <SupplementalTaxCalc />

      <Exercise
        title="Estimate a supplemental bill"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Increase: $700,000 − $250,000 = <strong>$450,000</strong>.</li>
            <li>Full year: $450,000 × 1.15% = $5,175. For 9 months: $5,175 × 9 ÷ 12 = <strong>$3,881</strong>.</li>
            <li>Plus the regular bill, now on $700,000: $8,050 a year.</li>
          </ul>
        }
      >
        <p>You buy at $700,000. The seller&apos;s old assessed value is $250,000. You close with 9 months left in the fiscal year. What is the supplemental bill, and what is the yearly regular bill afterwards?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="What is the supplemental tax bill for?"
          options={['A penalty for late payment', 'The extra tax for the rest of the fiscal year, after the county reassesses at your price', 'Your HOA', 'A mortgage fee']}
          correctIndex={1}
          explanation="It bridges the gap between the old assessed value and your price for the months you own."
        />
        <Quiz
          question="Which closing month gives the largest supplemental bill?"
          options={['June', 'March', 'November', 'July']}
          correctIndex={3}
          explanation="July leaves the whole fiscal year to bill."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The supplemental bill is a one-time, prorated tax on the difference between your price and the old assessed value.',
          'For the condo it is about $1,380 with a November close, and up to $2,070 with a July close.',
          'It is separate from your mortgage and often not in escrow. Save the cash.',
          'Your regular bill then follows the new value at about 1.15%.',
        ]}
      />
    </div>
  );
}
