import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { TaxBrackets } from '../../calculators';

export default function Step4_6_Dependents() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Income Tax"
        title="Dependents and Family Credits"
        summary="What a dependent is, what each one is worth in dollars, and how it changes your paycheck."
      />

      <Section title="What is a dependent?" />
      <p>
        A dependent is a person whose support you mainly provide: usually a child, sometimes an older relative.
        Claiming one lowers your tax through credits (and, for kids, a larger credit). There are two kinds.
      </p>
      <Table
        headers={['Kind', 'Main tests', 'What it is worth (2026)']}
        rows={[
          [<strong key="a">Qualifying child</strong>, 'Your child (or sibling, or a descendant). Under 19, or under 24 if a full-time student. Lived with you more than half the year. Did not provide more than half of their own support', '$2,200 child tax credit if under 17, or $500 if older'],
          [<strong key="b">Qualifying relative</strong>, 'A person (such as a parent) with very low income, for whom you pay more than half of the support', '$500 credit for other dependents'],
        ]}
      />

      <Section title="What kids are worth, in real tax dollars" />
      <p>A married couple earning $100,000 together, federal and California, 2026:</p>
      <Table
        headers={['', 'No kids', 'Two kids under 17', 'Saved']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['Federal income tax', '$7,640', '$3,240', '$4,400 (2 × $2,200)'],
          ['California income tax', '$1,946', '$964', '$982 (2 × $491)'],
          [<strong key="a">Total</strong>, <strong key="b">$9,586</strong>, <strong key="c">$4,204</strong>, <strong key="d">$5,382 a year</strong>],
        ]}
      />
      <p>
        Two kids cut this family&apos;s income tax by more than half. These are credits, so they come off the tax itself.
        That is why a W-4 that lists dependents correctly gives you a bigger paycheck all year (Topic 5).
      </p>

      <Section title="Other family tax breaks" />
      <Table
        headers={['Break', 'What it does', 'Notes']}
        rows={[
          [<strong key="a">Dependent care FSA</strong>, 'Pay for daycare or after-school care with pre-tax money', 'The yearly limit rises to $7,500 in 2026. Use-it-or-lose-it'],
          [<strong key="b">Child and dependent care credit</strong>, 'A credit for care costs while you work', 'Cannot double up with the same dollars in the FSA'],
          [<strong key="c">Earned income tax credit</strong>, 'A large credit for low and moderate earners, bigger with children', 'Check eligibility each year'],
          [<strong key="d">529 plan</strong>, 'Savings for education that grow tax-free when used for school', 'California does not give a state deduction for contributions'],
          [<strong key="e">Health coverage</strong>, 'Adding a child to your plan', 'You must add a newborn within 30 days of birth'],
        ]}
      />

      <Callout type="tip" title="After a baby">
        Get a Social Security number for the child. Update your W-4 at work and your health plan within 30 days. Open a
        529 if you want one. Update your life insurance and a will (Topic 6). Then re-run your budget.
      </Callout>

      <Section title="Try it" />
      <p>Switch on the kids in the calculator and watch the federal and California totals fall.</p>
      <TaxBrackets income={100000} status="married" />

      <QuizSet title="Check yourself">
        <Quiz
          question="A 10-year-old child qualifies for how much federal credit in 2026?"
          options={['$500', '$2,200', '$5,000', 'Nothing']}
          correctIndex={1}
          explanation="The child tax credit is $2,200 per qualifying child under 17."
        />
        <Quiz
          question="Which is a credit and which is a deduction: the child tax credit or a traditional 401k?"
          options={['Both are credits', 'The child tax credit is a credit and the 401k is a deduction', 'Both are deductions', 'The reverse']}
          correctIndex={1}
          explanation="The child credit reduces tax directly. The traditional 401k reduces taxable income."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A dependent is a child or relative you mainly support. Child tax credit: $2,200 under 17. Other dependents: $500.',
          'California gives a $491 credit per dependent.',
          'Two kids cut a $100,000 couple’s income tax by about $5,400 a year.',
          'Dependent care FSA limit rises to $7,500 in 2026. Update your W-4 and health plan after a birth.',
        ]}
      />
    </div>
  );
}
