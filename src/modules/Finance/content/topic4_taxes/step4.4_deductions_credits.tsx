import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_4_DeductionsCredits() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Income Tax"
        title="Deductions vs Credits"
        summary="A deduction shrinks the income you are taxed on. A credit shrinks the tax itself. A credit is worth far more per dollar."
      />

      <Section title="One dollar of each" />
      <Table
        headers={['', 'Deduction', 'Credit']}
        rows={[
          [<strong key="a">What it reduces</strong>, 'Your taxable income', 'Your tax bill, directly'],
          [<strong key="b">Worth of $1,000</strong>, 'Your marginal rate × $1,000. At 22%: $220', 'The full $1,000'],
          [<strong key="c">Higher earners</strong>, 'Worth more, because the marginal rate is higher', 'Worth the same, and may phase out'],
        ]}
      />
      <Callout type="info" title="Why this matters">
        A $1,000 deduction at the 22% bracket saves $220. A $1,000 credit saves $1,000. Credits are worth 4.5 times as
        much, which is why the child tax credit is so valuable.
      </Callout>

      <Section title="Standard vs itemized" />
      <p>
        Every filer reduces income by a <strong>standard deduction</strong>: $16,100 single or $32,200 married in 2026.
        Or you may <strong>itemize</strong> instead, adding up specific costs. You choose whichever is larger.
      </p>
      <Table
        headers={['Itemized deduction', 'Notes']}
        rows={[
          ['Mortgage interest', 'On up to $750,000 of home loan'],
          ['State and local taxes (SALT)', 'Income and property tax, up to a cap that rose to about $40,000 in the 2025 law and phases down at high incomes'],
          ['Charitable gifts', 'Cash and donated goods, with records'],
          ['Large medical costs', 'Only the part above 7.5% of your income'],
        ]}
      />
      <p>
        Most people take the standard deduction, because it is large. A single person would need over $16,100 of itemized costs to
        benefit. Mortgage interest, California income tax and charity can add up, which is why homeowners in high-tax
        states sometimes itemize (Topic 10).
      </p>

      <Section title="Deductions you can take no matter what (above the line)" />
      <Table
        headers={['Deduction', 'Why it exists']}
        rows={[
          [<strong key="a">Traditional 401k and traditional IRA</strong>, 'Pay tax later instead of now (Topic 7)'],
          [<strong key="b">HSA contributions</strong>, 'Federal tax break for health spending (not in California)'],
          [<strong key="c">Health insurance premiums through work</strong>, 'Taken out of pay before tax'],
          [<strong key="d">Student loan interest</strong>, 'Up to $2,500, income limits apply'],
          [<strong key="e">Half of self-employment tax</strong>, 'For 1099 workers (step 4.7)'],
          [<strong key="f">Self-employed health insurance, SEP-IRA</strong>, 'For 1099 workers'],
        ]}
      />
      <p>These reduce your income <em>and</em> you still get the standard deduction on top. They are the first place to look for tax savings.</p>

      <Section title="Credits that matter" />
      <Table
        headers={['Credit (2026)', 'What it is', 'Notes']}
        rows={[
          [<strong key="a">Child tax credit</strong>, '$2,200 per child under 17', 'Phases out above $200,000 single or $400,000 married. Up to $1,700 per child is refundable'],
          [<strong key="b">Credit for other dependents</strong>, '$500 per dependent who is not a qualifying child', 'Older children, parents'],
          [<strong key="c">Earned income tax credit</strong>, 'For low to moderate earners', 'Amount depends on income and children'],
          [<strong key="d">Education credits</strong>, 'American Opportunity: up to $2,500 a year for the first four years of college', 'Income limits'],
          [<strong key="e">Saver’s credit</strong>, 'A credit for lower-income people who save for retirement', 'Income limits'],
        ]}
      />

      <Compare
        goodLabel="Credits first"
        badLabel="Common mistakes"
        good={
          <>
            <p>Claim every credit you qualify for. They reduce tax dollar for dollar.</p>
            <p>Use the standard deduction unless itemizing is clearly bigger.</p>
            <p>Use the above-the-line deductions you control, like a traditional 401k.</p>
          </>
        }
        bad={
          <>
            <p>Spending money only to get a deduction. Spending $1 to save $0.22 is a loss.</p>
            <p>Itemizing without proof when the standard deduction is bigger.</p>
            <p>Forgetting credits because the software did not ask.</p>
          </>
        }
      />

      <Exercise
        title="Deduction or credit?"
        hint={<p>A deduction is worth the amount times your marginal rate. A credit is worth the full amount.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>$2,000 deduction at 22%: <strong>$440</strong> saved.</li>
            <li>$1,000 credit: <strong>$1,000</strong> saved. The credit wins.</li>
            <li>The $2,000 deduction would need to be worth about $4,545 to match ($1,000 ÷ 22%).</li>
          </ul>
        }
      >
        <p>You are in the 22% bracket. Which saves more: a $2,000 deduction or a $1,000 credit? By how much?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="You are in the 24% bracket. A $500 deduction saves how much tax?"
          options={['$500', '$120', '$24', '$240']}
          correctIndex={1}
          explanation="$500 × 24% = $120."
        />
        <Quiz
          question="Which is worth more, a $300 deduction or a $300 credit?"
          options={['The deduction', 'The credit', 'They are equal', 'Neither helps']}
          correctIndex={1}
          explanation="A credit reduces tax dollar for dollar. A deduction only saves your marginal rate times the amount."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A deduction cuts taxable income. A credit cuts the tax itself. A $1,000 credit beats a $1,000 deduction.',
          'Standard deduction 2026: $16,100 single, $32,200 married. Itemize only if your costs are higher.',
          'Above-the-line deductions (traditional 401k, HSA) are available on top of the standard deduction.',
          'Child tax credit: $2,200 per child under 17.',
        ]}
      />
    </div>
  );
}
