import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 2 • Start Here"
        title="Income and Expenses: The Two Levers"
        summary="Wealth comes from one simple gap: what comes in minus what goes out. Pull both levers, and pull income harder."
      />

      <p>
        Everything in personal finance rests on one subtraction. Whatever is left after your spending is what you can
        use to pay off debt, build a safety net and invest. There are only two ways to make the gap bigger.
      </p>
      <Formula label="The whole game" where={[{ symbol: 'Income', meaning: 'money coming in, after tax' }, { symbol: 'Expenses', meaning: 'money going out' }, { symbol: 'Savings', meaning: 'the gap you invest' }]}>
        Savings = Income − Expenses
      </Formula>

      <Section title="The two levers" />
      <Table
        headers={['Lever', 'How far can it go?', 'The playbook view']}
        rows={[
          [<strong key="a">Spend less</strong>, 'You can only cut so far. You cannot spend less than zero, and life has a floor of rent, food and insurance', 'Do it, but do not obsess. Cut the waste, not the joy'],
          [<strong key="b">Earn more</strong>, 'No ceiling at all', 'This is the lever that builds wealth. Increase it as hard as you can'],
        ]}
      />
      <Callout type="success" title="The headline message">
        Cutting coffee will not make you rich. Doubling your income can. This topic is about income first, then about
        spending in a way that does not make you miserable.
      </Callout>

      <Section title="The philosophy in one paragraph" />
      <p>
        <strong>Fixed income covers fixed expenses. Variable income covers variable expenses. Save whatever is left over.</strong>{' '}
        And you <strong>must have a variable income alongside your 9-to-5</strong>. The next lessons explain each piece:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>2.1</strong> W-2 vs 1099: how the type of income changes what you owe.</li>
        <li><strong>2.2</strong> The philosophy: what fixed and variable mean, and why we split them.</li>
        <li><strong>2.3</strong> Why a variable income is non-negotiable, and where it comes from.</li>
        <li><strong>2.4</strong> Budgeting that fits on one page.</li>
        <li><strong>2.5</strong> The emergency fund.</li>
        <li><strong>2.6</strong> Lifestyle creep: how raises disappear.</li>
        <li><strong>2.7</strong> A plan to increase income.</li>
      </ul>

      <KeyTakeaways
        items={[
          'Savings = income − expenses. There are two levers.',
          'Spending has a floor. Income has no ceiling.',
          'Fixed income covers fixed expenses, variable covers variable, save the rest.',
          'You must have a variable income next to your 9-to-5.',
        ]}
      />
    </div>
  );
}
