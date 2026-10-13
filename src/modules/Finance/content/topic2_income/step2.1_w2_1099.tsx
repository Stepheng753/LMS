import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { SelfEmploymentTax } from '../../calculators';

export default function Step2_1_W2_1099() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 2 • Income"
        title="W-2 vs 1099: Shared Costs vs Full Price"
        summary="On a W-2 your employer splits the taxes and benefits with you. On a 1099 you pay full price for everything."
      />

      <p>
        When someone pays you, they send a tax form at the end of the year. The form tells you which of two worlds you
        live in, and the difference is large.
      </p>

      <Section title="The one-sentence difference" />
      <Callout type="info" title="W-2 is shared. 1099 is all you.">
        On a <strong>W-2</strong>, your employer pays an <em>employer</em> share of the payroll taxes and you pay an
        <em> employee</em> share, so you only carry about <strong>half</strong>. The same is true for benefits: the employer
        pays a big part of your health insurance and adds a 401k match. On a <strong>1099</strong>, you are both the
        employer and the employee: you pay <strong>the full price</strong> of the taxes and the full price of the benefits.
      </Callout>

      <Flow
        steps={[
          { title: 'W-2 employee', sub: 'Employer withholds your share' },
          { title: 'Employer ALSO pays', sub: 'its own matching tax', via: 'half and half' },
          { title: '1099 contractor', sub: 'Nobody withholds anything', via: 'versus' },
          { title: 'You pay BOTH halves', sub: 'and send it in yourself', via: 'full price' },
        ]}
      />

      <Section title="The taxes, side by side" />
      <Table
        headers={['', 'W-2 employee', '1099 contractor']}
        rows={[
          [<strong key="a">Social Security (6.2% each side)</strong>, 'You pay 6.2%. Employer pays another 6.2%', 'You pay 12.4% (both sides)'],
          [<strong key="b">Medicare (1.45% each side)</strong>, 'You pay 1.45%. Employer pays another 1.45%', 'You pay 2.9% (both sides)'],
          [<strong key="c">Total payroll tax</strong>, 'You pay 7.65% of wages', 'You pay 15.3% of 92.35% of profit, about 14.1%'],
          [<strong key="d">Income tax</strong>, 'Withheld from every paycheck', 'You calculate it and pay it yourself, every quarter'],
          [<strong key="e">Unemployment, disability (CA)</strong>, 'Employer pays unemployment tax, you pay SDI', 'Not covered. You get no unemployment unless you opt in'],
        ]}
      />

      <Section title="The benefits, side by side" />
      <Compare
        goodLabel="W-2: shared benefits"
        badLabel="1099: full price"
        good={
          <>
            <p>Employer pays a large part of your <strong>health insurance</strong>.</p>
            <p>May add a <strong>401k match</strong>: free money.</p>
            <p><strong>Paid time off</strong>, holidays and sick days.</p>
            <p><strong>Unemployment</strong> benefits if laid off.</p>
            <p>Workers&apos; compensation if hurt on the job.</p>
          </>
        }
        bad={
          <>
            <p>You buy your own <strong>health insurance</strong>, in full.</p>
            <p>No match. You fund your own <strong>retirement</strong> (a SEP-IRA or solo 401k).</p>
            <p><strong>No paid days off.</strong> If you stop working, you stop earning.</p>
            <p>No unemployment safety net.</p>
            <p>You carry your own liability and equipment costs.</p>
          </>
        }
      />
      <p>
        That is why a 1099 rate needs to be <strong>higher</strong> than a W-2 salary for the same work. A common rule
        of thumb is to ask for 25% to 50% more, just to land in the same place.
      </p>

      <Section title="The one big upside of 1099: deductions" />
      <p>
        A W-2 employee pays tax on nearly everything they earn. A 1099 person pays tax on <strong>profit</strong>: income
        minus business expenses. Software, equipment, supplies, a share of the internet bill, mileage, a home office,
        and more can reduce taxable profit. The rules are strict and you must keep records, but this is a real benefit
        that W-2 workers do not get.
      </p>

      <Section title="See the difference in dollars" />
      <p>
        The calculator compares a 1099 person with the same dollars earned as W-2 wages. Look at the line that says
        &quot;you pay extra as 1099&quot;. Then change the income and filing status.
      </p>
      <SelfEmploymentTax />

      <Callout type="warning" title="Do not confuse the two forms">
        A company cannot just call a regular employee a contractor to save on taxes. If they control your hours, tools and
        how you work, you are probably an employee, and misclassification is illegal. If you are unsure, ask a tax
        professional or read the IRS guidance on worker classification.
      </Callout>

      <QuizSet title="Check yourself">
        <Quiz
          question="You earn $60,000 as a W-2 employee. Your employer also pays the matching Social Security and Medicare tax. Roughly how much is that?"
          options={['About $460', 'About $4,600', 'About $9,200', 'Nothing']}
          correctIndex={1}
          explanation="7.65% of $60,000 is $4,590. You never see it, but it is money your employer pays for you."
        />
        <Quiz
          question="Why does a 1099 contractor need a higher rate than a W-2 salary for the same work?"
          options={['It is the law', 'They pay both halves of payroll tax and buy their own benefits', 'Contractors work harder', 'Clients pay more']}
          correctIndex={1}
          explanation="The contractor pays the employer's share and the full cost of insurance, retirement and time off."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'W-2: you and your employer split the payroll taxes and the benefits.',
          '1099: you pay both halves of payroll tax (about 14.1% of profit) and the full cost of benefits.',
          'A 1099 rate must be about 25% to 50% higher to equal a W-2 salary.',
          '1099 income can be reduced by real business expenses. Keep records.',
          'Quarterly estimated taxes are your job on 1099 income (Topic 4).',
        ]}
      />
    </div>
  );
}
