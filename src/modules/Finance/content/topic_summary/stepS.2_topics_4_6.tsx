import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_2_Topics4to6() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Recap"
        title="Recap: Taxes, Your Paycheck and Insurance"
        summary="Topics 4 to 6: how tax brackets work, where a $100,000 paycheck goes, and what to insure."
      />

      <Section title="Topic 4: Taxes (2026)" />
      <Table
        headers={['Idea', 'Rule or number']}
        rows={[
          ['Brackets', 'Income fills buckets. Marginal rate is your last dollar, effective rate is total tax ÷ income. A raise never lowers pay'],
          ['$100,000 single', 'Federal $13,170 (13.2% of gross), California $4,911, plus FICA $7,650 and SDI $1,241'],
          ['Standard deduction', 'Federal $16,100 single, $32,200 married. California $5,900 / $11,800'],
          ['Deduction vs credit', 'A $1,000 deduction saves your rate × $1,000. A $1,000 credit saves $1,000'],
          ['Single vs married', 'Equal earners pay the same. One large earner saves a lot as a couple'],
          ['Child tax credit', '$2,200 per child under 17. California $491 per dependent'],
          ['1099', 'Save 25% to 30%. Pay quarterly: Apr 15, Jun 15, Sep 15, Jan 15. California 30/40/0/30'],
          ['Investments', 'Hold over a year for 0/15/20% federal. California taxes all gains as ordinary income'],
        ]}
      />

      <Section title="Topic 5: Your Paycheck" />
      <Table
        headers={['Line ($100,000, California, 26 paychecks, Roth 401k maxed)', 'Per year', 'Per paycheck']}
        align={['left', 'right', 'right']}
        rows={[
          ['Gross', '$100,000', '$3,846.15'],
          ['Health, dental, vision (pre-tax)', '$4,550', '$175.00'],
          ['Federal income tax', '$12,169', '$468.04'],
          ['Social Security + Medicare', '$7,302', '$280.84'],
          ['California income tax + SDI', '$5,729', '$220.32'],
          ['Roth 401k (post-tax)', '$24,500', '$942.31'],
          [<strong key="a">Net pay</strong>, <strong key="b">$45,751</strong>, <strong key="c">$1,759.64</strong>],
        ]}
      />
      <p>Pre-tax items cost less than a dollar of take-home. A Roth costs a full dollar now. The W-4 only sets withholding. A stub is an estimate.</p>

      <Section title="Topic 6: Insurance" />
      <Table
        headers={['Policy', 'Rule']}
        rows={[
          ['The rule', 'Insure what you cannot afford to lose. Self-insure the rest'],
          ['Health', 'Compare total yearly cost at several levels of care. Healthy people usually win with an HDHP + HSA'],
          ['Auto', 'Liability 100/300/100 or more. Keep uninsured motorist. Drop collision on an old car'],
          ['Renters / home', 'Renters costs $10 to $25 a month. Replacement cost. HO-6 for a condo. Earthquake is separate'],
          ['Life', 'Only if someone depends on you. 10 to 12 times income. 20 to 30 year term. No whole life'],
          ['Disability and umbrella', 'Replace 50% to 70% of income. $1 million umbrella once you own assets'],
        ]}
      />

      <Callout type="success" title="The thread">
        Know the rules (taxes), know where each dollar of pay goes (the paycheck), and put a fence around it all (insurance).
      </Callout>

      <QuizSet title="Quick check">
        <Quiz
          question="What reduces Social Security tax: a traditional 401k, a Roth 401k, or health premiums?"
          options={['The traditional 401k', 'The Roth 401k', 'Health premiums', 'All three']}
          correctIndex={2}
          explanation="Premiums, HSA and FSA lower FICA wages. 401k contributions do not."
        />
        <Quiz
          question="Which saves more: a $1,000 deduction at 22% or a $300 credit?"
          options={['The deduction', 'The credit', 'Equal', 'Neither']}
          correctIndex={1}
          explanation="$220 vs $300."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Brackets are buckets. Credits beat deductions. Married couples with equal incomes pay the same.',
          'A $100,000 paycheck nets $1,759.64 every two weeks with a maxed Roth 401k.',
          'Insure the big risks: health, auto liability, home or renters, term life, disability, umbrella.',
        ]}
      />
    </div>
  );
}
