import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_8_Estimate() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 5 • Your Paycheck"
        title="Why a Paycheck Is Only an Estimate"
        summary="Your stub is a good guess at your tax, not the final answer. Here are the reasons it can be off, and how to plan for them."
      />

      <Callout type="info" title="The one-sentence reason">
        Your employer withholds tax every two weeks using a formula and the information on your W-4, as if the current
        paycheck repeated all year. Your actual tax depends on <strong>the whole year</strong> and on <strong>everything
        else you earned</strong>, which your employer cannot see.
      </Callout>

      <Section title="Eight reasons withholding and real tax differ" />
      <Table
        headers={['Reason', 'What happens', 'Example']}
        rows={[
          [<strong key="a">1. Other income</strong>, 'Side work, interest and dividends, a spouse’s job. Nobody withholds on them from this paycheck', '$20,000 of freelancing leads to about $6,260 owed'],
          [<strong key="b">2. Bonuses and commissions</strong>, 'Withheld at a flat supplemental rate: 22% federal. California takes 10.23% from bonuses', 'A $10,000 bonus is withheld as if every dollar were taxed at 22%'],
          [<strong key="c">3. The Social Security cap</strong>, 'Social Security stops at $184,500 of wages, so later checks are bigger', 'A $250,000 salary stops paying it around paycheck 20'],
          [<strong key="d">4. Raises mid-year</strong>, 'The formula assumes each paycheck repeats for the year', 'A raise in June is not reflected in the earlier checks'],
          [<strong key="e">5. Life changes</strong>, 'Marriage, a baby, a home purchase', 'The W-4 is not updated automatically'],
          [<strong key="f">6. Three-paycheck months</strong>, 'With 26 paychecks, two months a year have three', 'Great for the budget, but it is not extra income'],
          [<strong key="g">7. Deductions and credits at filing</strong>, 'Itemizing, student loan interest, education credits are applied when you file', 'May produce a refund'],
          [<strong key="h">8. Rounding and tables</strong>, 'Payroll systems use tables with rounded steps', 'A few dollars either way'],
        ]}
      />

      <Section title="The 26 paychecks and the 12 months" />
      <p>
        With a paycheck every two weeks there are <strong>26 paychecks</strong> a year. Months have 2 or 3 of them. Two
        months a year you receive three paychecks. Budget by the <strong>two-paycheck</strong> amount and treat the third
        as a bonus: send it to debt, the emergency fund or investing.
      </p>
      <Table
        headers={['Pay frequency', 'Paychecks per year', 'Per paycheck ($100,000, before everything)']}
        align={['left', 'right', 'right']}
        rows={[
          ['Weekly', '52', '$1,923.08'],
          ['Every 2 weeks (biweekly)', '26', '$3,846.15'],
          ['Twice a month (semi-monthly)', '24', '$4,166.67'],
          ['Monthly', '12', '$8,333.33'],
        ]}
      />
      <p>Biweekly looks like 12 months of 2 paychecks, but 26 ÷ 12 = 2.17, not 2. Do not confuse the stub frequency with the month.</p>

      <Section title="What to do about it" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Treat the stub as an estimate.</strong> Check it against the calculator every year or two.</li>
        <li><strong>Use the IRS withholding estimator</strong> once a year, and after any life change.</li>
        <li><strong>Add withholding or pay quarterly</strong> if you have significant income outside the paycheck.</li>
        <li><strong>Keep a small cushion</strong> in your emergency fund for a small tax bill.</li>
        <li><strong>Budget by the two-paycheck month</strong>, and send the extra paychecks to your goals.</li>
      </ul>

      <Callout type="warning" title="This course&apos;s calculators are estimates too">
        The paycheck calculator uses the real 2026 federal and California rules, but it is a simplified model. Your actual
        employer, plan, benefits and W-4 will produce slightly different numbers. Use it to understand and plan, not to
        file a return.
      </Callout>

      <QuizSet title="Check yourself">
        <Quiz
          question="Why do two months a year have three paychecks if you are paid every two weeks?"
          options={['It is a bonus', '26 paychecks do not divide evenly into 12 months', 'The employer makes a mistake', 'It only happens to new employees']}
          correctIndex={1}
          explanation="26 paychecks a year gives 2 extra paychecks beyond two per month."
        />
        <Quiz
          question="Which of these causes withholding to be too low?"
          options={['A big refund last year', '$20,000 of side income with no extra withholding', 'Claiming zero dependents', 'Paying quarterly estimates']}
          correctIndex={1}
          explanation="Income your employer cannot see is not withheld on."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Withholding assumes each paycheck repeats all year, and ignores your other income.',
          'Bonuses, the Social Security cap, raises and life changes make stubs drift from the real tax.',
          '26 biweekly paychecks means two three-paycheck months. Budget by two.',
          'Use the IRS withholding estimator and update the W-4 after changes.',
        ]}
      />
    </div>
  );
}
