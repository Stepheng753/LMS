import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { BudgetSplit } from '../../calculators';

export default function Step2_2_Philosophy() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 2 • Philosophy"
        title="Fixed Covers Fixed. Variable Covers Variable."
        summary="The one rule that keeps your bills safe and your savings growing."
      />

      <Section title="Two kinds of income, two kinds of expenses" />
      <Table
        headers={['', 'Fixed', 'Variable']}
        rows={[
          [<strong key="a">Income</strong>, 'The same amount on a schedule: a salary, a pension', 'Changes month to month: freelance, side work, commissions, bonuses, overtime, rental income'],
          [<strong key="b">Expenses</strong>, 'The same bill every month: rent, insurance, phone, loan minimums, subscriptions', 'Changes with your choices: groceries, eating out, fun, clothes, gifts, travel'],
        ]}
      />

      <Section title="The rule" />
      <Flow
        steps={[
          { title: 'Fixed income', sub: 'Your 9-to-5' },
          { title: 'Covers fixed expenses', sub: 'Rent, insurance, minimums', via: 'pays' },
          { title: 'Variable income', sub: 'Side work, bonuses', via: 'then' },
          { title: 'Covers variable expenses', sub: 'Food out, fun, shopping', via: 'pays' },
          { title: 'Save what is left', sub: 'Order of operations', via: 'invest' },
        ]}
      />
      <Callout type="success" title="Why it works">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Your base is safe.</strong> Even in a month with no side income, your steady paycheck pays the bills that cannot wait. You never miss rent because a client paid late.</li>
          <li><strong>Spending has a budget.</strong> Fun money comes from fun income. If the side income is small, the fun is small. Spending stays tied to what you actually earned.</li>
          <li><strong>You can see the gap.</strong> Whatever is left from both columns is real savings, and it is easy to measure.</li>
          <li><strong>Raises go further.</strong> Extra variable income lands in the savings column, not in your lifestyle.</li>
        </ul>
      </Callout>

      <Section title="The fixed-expense test" />
      <p>
        The most important number is the share of your fixed income that fixed expenses eat. If your fixed expenses are
        <strong> 50% or less</strong> of your fixed income, you are comfortable. At 70% or more, one surprise can sink
        you. The biggest fixed expense is almost always housing, so a common guide is to keep rent or a mortgage payment
        under about 30% of gross income.
      </p>

      <Section title="A worked example" />
      <Table
        headers={['Per month', 'Amount']}
        align={['left', 'right']}
        rows={[
          ['Fixed income (take-home from the 9-to-5)', '$5,200'],
          ['Fixed expenses: rent $1,900, insurance $320, phone $120, debt minimums $250', '$2,590'],
          [<strong key="a">Left from the fixed side</strong>, <strong key="b">$2,610</strong>],
          ['Variable income (side work)', '$900'],
          ['Variable expenses: groceries $500, eating out $300, fun $250, shopping $200', '$1,250'],
          [<strong key="c">Left from the variable side</strong>, <strong key="d">−$350</strong>],
          [<strong key="e">Saved: $2,610 − $350</strong>, <strong key="f">$2,260 a month</strong>],
        ]}
      />
      <p>
        The variable side is short by $350. That is fine: the fixed side had room to cover it. The warning sign is when
        variable spending keeps beating variable income. That says either earn more on the side or spend less on fun.
      </p>

      <Section title="Play with it" />
      <p>
        Change any number. Try the presets: no variable income at all, a bigger side income, rent that is too high, and
        lifestyle creep. Watch the &quot;left to save&quot; number.
      </p>
      <BudgetSplit />

      <QuizSet title="Check yourself">
        <Quiz
          question="Which of these is a variable expense?"
          options={['Rent', 'Car insurance', 'Eating out', 'Phone plan']}
          correctIndex={2}
          explanation="You choose how much to spend on eating out each month. Rent, insurance and phone are fixed."
        />
        <Quiz
          question="What is the main benefit of paying fixed bills only from fixed income?"
          options={['Lower taxes', 'Your essential bills are safe even in a month with no side income', 'Higher interest', 'Bigger raises']}
          correctIndex={1}
          explanation="The steady paycheck protects the bills that cannot wait."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Fixed income covers fixed expenses. Variable income covers variable expenses. Save what is left.',
          'Fixed expenses should be 50% or less of fixed income. Housing under about 30% of gross.',
          'Spending stays tied to what you actually earned this month.',
          'Extra variable income is savings, not a bigger lifestyle.',
        ]}
      />
    </div>
  );
}
