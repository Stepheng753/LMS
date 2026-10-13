import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step10_6_PropertyTax() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • Property Tax"
        title="Property Tax in San Diego and Proposition 13"
        summary="About 1.1% to 1.25% of the price each year, with a famous California rule that caps how fast your bill can rise."
      />

      <Section title="How the bill is built" />
      <Table
        headers={['Part', 'Rate', 'Notes']}
        rows={[
          [<strong key="a">Base property tax</strong>, '1% of the assessed value', 'Set by Proposition 13 (1978)'],
          [<strong key="b">Voter-approved bonds and local assessments</strong>, 'About 0.1% to 0.25%', 'Schools, water and city measures. Varies by address'],
          [<strong key="c">Mello-Roos / special taxes</strong>, 'Fixed dollars, sometimes thousands a year', 'Common in newer developments. Always ask'],
          [<strong key="d">Total in San Diego County</strong>, 'About 1.1% to 1.25% of assessed value', 'The course uses 1.15%'],
        ]}
      />
      <p>
        For the $500,000 condo, 1.15% is <strong>$5,750 a year</strong>, or $479 a month, in year 1. It is usually paid twice
        a year (November and February) and often through your mortgage escrow.
      </p>

      <Section title="Proposition 13: the lock on your assessment" />
      <Callout type="info" title="The rule in plain words">
        Your property tax is based on the <strong>assessed value</strong>, not the market value. When you buy, the assessed
        value is set to your purchase price. After that it can rise by <strong>no more than 2% a year</strong>, no matter how
        fast the real market value climbs. The value is re-set to market only when the property is sold (or in certain transfers).
      </Callout>
      <p>The condo bought at $500,000, with the market value rising 4% a year and the assessed value rising 2%:</p>
      <Table
        headers={['After', 'Market value', 'Assessed value', 'Your tax (1.15%)', 'A new buyer pays tax on']}
        align={['left', 'right', 'right', 'right', 'right']}
        rows={[
          ['Year 1', '$520,000', '$500,000', '$5,750', '$520,000 ($5,980)'],
          ['Year 10', '$740,122', '$597,546', '$6,872', '$740,122 ($8,511)'],
        ]}
      />
      <p>
        In year 10 the owner pays $6,872 and an identical neighbor who just bought pays $8,511, about
        <strong> $1,639 less a year</strong> for the same home. This is the benefit of staying put. It also means long-time
        owners are reluctant to sell, and that moving can raise your property tax even to a similar home.
      </p>

      <Compare
        goodLabel="What Prop 13 gives you"
        badLabel="What it costs you"
        good={
          <>
            <p><strong>Predictable.</strong> Your bill rises at most 2% a year.</p>
            <p>Strong protection for long-term owners.</p>
            <p>The longer you stay, the bigger the gap.</p>
          </>
        }
        bad={
          <>
            <p><strong>A sale resets the bill</strong> to the new price. Trading up costs more tax.</p>
            <p>Buyers of recently sold homes pay more than neighbors.</p>
            <p>Supplemental tax bill after you buy (step 10.7).</p>
          </>
        }
      />

      <Section title="Other facts to know" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Homeowners&apos; exemption:</strong> if the home is your primary residence you can claim a $7,000 reduction in assessed value, worth about $70 a year. Apply with the county assessor.</li>
        <li><strong>Transfers and inheritance:</strong> a sale normally reassesses. Parent-to-child transfers are limited by Proposition 19. Older homeowners (55+) and some disabled owners can move their low assessment to a new home in some cases. Check current rules.</li>
        <li><strong>Federal deduction:</strong> property tax is an itemized deduction, together with California income tax, under a cap that rose to about $40,000 for 2025 and 2026 and phases down at high incomes.</li>
        <li><strong>Mortgage escrow:</strong> your lender may collect $479 a month with your payment and pay the county for you.</li>
      </ul>

      <Section title="Could you itemize with a mortgage? (an illustration)" />
      <p>A single filer earning $100,000 in the first year of the $400,000 loan:</p>
      <Table
        headers={['Deduction', 'Amount']}
        align={['left', 'right']}
        rows={[
          ['Mortgage interest (year 1)', '$25,868'],
          ['Property tax', '$5,750'],
          ['California income tax', '$4,911'],
          [<strong key="a">Total itemized</strong>, <strong key="b">$36,529</strong>],
          ['Standard deduction (single, 2026)', '$16,100'],
          ['Extra deduction from itemizing', '$20,429'],
          ['Federal tax saved at 22%', 'about $4,494 a year'],
        ]}
      />
      <p>
        That saving shrinks each year as the loan shrinks and interest falls. It is real, but it is not why you buy: it
        offsets only a little of a $25,868 interest bill.
      </p>

      <QuizSet title="Check yourself">
        <Quiz
          question="After you buy under Proposition 13, how fast can your assessed value rise per year?"
          options={['With the market', 'At most 2%', 'At most 10%', 'It cannot change']}
          correctIndex={1}
          explanation="The assessed value can rise at most 2% a year until the property is sold."
        />
        <Quiz
          question="Why might a new neighbor pay more property tax than you for the same home?"
          options={['They are richer', 'Their assessed value was reset to a higher recent price', 'They live closer', 'It is a mistake']}
          correctIndex={1}
          explanation="A sale resets the assessed value to the purchase price."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'San Diego property tax is about 1.1% to 1.25% of assessed value: $5,750 a year on the $500,000 condo.',
          'Prop 13: the assessed value starts at the purchase price and can rise at most 2% a year until a sale.',
          'In year 10 the owner pays about $1,639 a year less than a new buyer of the same home.',
          'Ask about Mello-Roos and special assessments before you buy.',
        ]}
      />
    </div>
  );
}
